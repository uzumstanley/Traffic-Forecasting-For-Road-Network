package routes

func (r *Routes) EdgeRoute() {
	r.Controller.Router.GET("/edges", r.Controller.GetEdges)
}
