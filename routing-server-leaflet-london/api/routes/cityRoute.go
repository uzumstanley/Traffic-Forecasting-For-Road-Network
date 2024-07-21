package routes

func (r *Routes) CityRoute() {
	r.Controller.Router.GET("/cities", r.Controller.GetCities)
	r.Controller.Router.GET("/cities/search", r.Controller.FuzzyFindCity)
	r.Controller.Router.GET("/city/route", r.Controller.GetShortestRouteByCity)
	r.Controller.Router.GET("city/location/search", r.Controller.GetLocationByName)
}
