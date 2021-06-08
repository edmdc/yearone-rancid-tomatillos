package main

import (
	"github.com/edmdc/yearone-rancid-tomatillos/api/internal/api"
	"github.com/edmdc/yearone-rancid-tomatillos/api/pkg/config"
	"github.com/edmdc/yearone-rancid-tomatillos/api/pkg/data"
)

func main() {
	config := config.LoadEnv()
	db := data.ConnectDb(config)
	defer db.Disconnect()
	app := api.New(config, db.Client)
	app.Start()
}
