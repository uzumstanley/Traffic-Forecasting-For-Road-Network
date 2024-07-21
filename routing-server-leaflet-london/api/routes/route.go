package routes

import controller "routing/api/controllers"

type Routes struct {
	Controller *controller.Controller
}

func NewRoutes(controller *controller.Controller) *Routes {
	return &Routes{Controller: controller}
}
