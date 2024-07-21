package routes

func (r *Routes) NodeRoute() {
	r.Controller.Router.GET("/nodes", r.Controller.GetNodes)
	r.Controller.Router.GET("/nodes/:id", r.Controller.GetNodeByID)
	r.Controller.Router.GET("/nodes/geoms/:id", r.Controller.GetNodePointGeomByID)
	r.Controller.Router.GET("/nodes/geoms", r.Controller.GetNodePointGeoms)
	r.Controller.Router.GET("/nodes/route", r.Controller.GetShortestRouteByNodes)
}
