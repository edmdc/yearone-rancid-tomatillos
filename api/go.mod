module github.com/edmdc/yearone-rancid-tomatillos/api

go 1.16

replace github.com/edmdc/yearone-rancid-tomatillos/api/pkg/config => ./pkg/config
replace github.com/edmdc/yearone-rancid-tomatillos/api/pkg/data => ./pkg/data
replace github.com/edmdc/yearone-rancid-tomatillos/api/pkg/domain => ./pkg/domain
replace github.com/edmdc/yearone-rancid-tomatillos/api/pkg/models => ./pkg/models
replace github.com/edmdc/yearone-rancid-tomatillos/api/pkg/services => ./pkg/services
replace github.com/edmdc/yearone-rancid-tomatillos/api/internal/api => ./internal/api

require (
	github.com/go-chi/chi v1.5.4
	github.com/go-chi/cors v1.2.0
	github.com/joho/godotenv v1.3.0
	github.com/pkg/errors v0.9.1
	go.mongodb.org/mongo-driver v1.5.3
)
