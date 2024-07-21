package config

import (
	"github.com/spf13/viper"
	"os"
)

// Config stores all configuration of the application.
// The values are read by viper from a config file or environment variable.
type Config struct {
	DBUrl         string `mapstructure:"DATABASE_URL"`
	ServerAddress string `mapstructure:"SERVER_ADDRESS"`
}

// LoadConfig reads configuration from file or environment variables.
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

	if os.Getenv("ENV") == "production" {
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

	err = viper.Unmarshal(&config)
	return
}
