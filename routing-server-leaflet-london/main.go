package main

import (
	"context"
	"fmt"
	"os"
	"runtime"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/exp/slog"

	"routing/api"
	"routing/config"
	db "routing/db/sqlc"
)

func main() {
	runtime.GOMAXPROCS(runtime.NumCPU())

	// Load environment variables
	config.LoadEnv()

	// Get database URL from environment variables (Fixing incorrect getenv usage)
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		fmt.Println("❌ ERROR: DATABASE_URL is not set.")
		return
	}
	fmt.Println("✅ Database URL:", databaseURL)

	// Run the main application
	Run()
}

// Initialize DB connection
func InitDB(dbUrl string) (*pgxpool.Pool, error) {
	conn, err := pgxpool.New(context.Background(), dbUrl)
	if err != nil {
		return nil, err
	}
	return conn, nil
}

// Deallocate all prepared statements
func DeallocateAllPreparedStatements(conn *pgxpool.Pool) error {
	acquire, err := conn.Acquire(context.Background())
	if err != nil {
		return err
	}
	defer acquire.Release()

	acquire.Conn().Config().DefaultQueryExecMode = pgx.QueryExecModeDescribeExec
	acquire.Conn().Config().DescriptionCacheCapacity = 2024
	err = acquire.Conn().DeallocateAll(context.Background())
	if err != nil {
		return err
	}
	return nil
}

// Run application logic
func Run() {
	logger := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo}))

	logger.Info("Loading configurations...")
	configEnv, err := config.LoadConfig(".")
	if err != nil {
		logger.Error("Cannot load configurations", "error", err)
		return
	}
	logger.Info("Configurations loaded")

	logger.Info("Connecting to database...", "database_url", configEnv.DBUrl)
	conn, err := InitDB(configEnv.DBUrl)
	if err != nil {
		logger.Error("Unable to connect to database", "error", err)
		return
	}
	logger.Info("Database connected")

	logger.Info("Deallocating all prepared statements...")
	err = DeallocateAllPreparedStatements(conn)
	if err != nil {
		logger.Error("Unable to deallocate prepared statements", "error", err)
		return
	}
	logger.Info("Deallocated all prepared statements")

	logger.Info("Creating new store...")
	store := db.NewStore(conn)

	logger.Info("Initializing server...")
	server, err := api.NewServer(store)
	if err != nil {
		logger.Error("Cannot initialize server", "error", err)
		return
	}
	logger.Info("Server initialized")

	logger.Info("Running server", "address", configEnv.ServerAddress)
	err = server.RunServer(configEnv.ServerAddress)
	if err != nil {
		logger.Error("Could not run server", "error", err)
		return
	}
}
