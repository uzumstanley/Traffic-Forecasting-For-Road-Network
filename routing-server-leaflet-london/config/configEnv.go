package config

import (
	"github.com/joho/godotenv"
	"github.com/spf13/viper"
	"log"
	"os"
)

// LoadEnv loads the environment variables from a .env file
func LoadEnv() {
	err := godotenv.Load("config.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

// Config stores all configuration of the application.
type Config struct {
	DBUrl         string `mapstructure:"DATABASE_URL"` // Corrected mapping for DATABASE_URL
	ServerAddress string `mapstructure:"SERVER_ADDRESS"` // Server address
}

// LoadConfig reads configuration from a file or environment variables
func LoadConfig(path string) (config Config, err error) {
	envMode := os.Getenv("ENV")
	if envMode == "" {
		envMode = "production"
	}

	var envFileName string
	if envMode == "development" {
		envFileName = "devconfig.env"
	} else {
		envFileName = "config.env"
	}

	// Set configuration file for viper based on environment mode
	if envMode == "production" {
		viper.SetConfigName("config")
	} else {
		viper.SetConfigName("devconfig")
	}
	viper.AddConfigPath(path)
	viper.SetConfigFile(path + "/" + envFileName)
	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		return
	}

	// Read and unmarshal environment variables or config file values into config struct
	err = viper.Unmarshal(&config)
	return
}
