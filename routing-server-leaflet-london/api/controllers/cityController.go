package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"routing/api/utils"
	"routing/db"
)

func (c *Controller) GetCities(ctx *gin.Context) {
	places, err := c.store.ListCities(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, utils.ErrorResponse(err))
		return
	}
	ctx.JSON(http.StatusOK, places)
}

func (c *Controller) ServerActive(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"message": "Server is up and Running"})
}

func (c *Controller) GetShortestRouteByCity(ctx *gin.Context) {
	var req db.RouteRequest
	err := ctx.ShouldBind(&req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, utils.ErrorResponse(err))
		return
	}
	c.handlerBody(ctx, &req)
}

func (c *Controller) FuzzyFindCity(ctx *gin.Context) {
	var req db.SearchText
	if err := ctx.ShouldBind(&req); err != nil {
		ctx.JSON(http.StatusInternalServerError, utils.ErrorResponse(err))
		return
	}

	result, err := c.store.SearchCity(ctx, req.Text)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, utils.ErrorResponse(err))
		return
	}
	ctx.JSON(http.StatusOK, result)
}

func (c *Controller) GetLocationByName(ctx *gin.Context) {
	var req db.LocationRequest
	if err := ctx.ShouldBind(&req); err != nil {
		ctx.JSON(http.StatusInternalServerError, utils.ErrorResponse(err))
		return
	}
	location, err := c.store.GetCity(ctx, req.Name)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, utils.ErrorResponse(err))
		return
	}
	ctx.JSON(http.StatusOK, location)
}
