package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"routing/api/utils"
)

func (c *Controller) GetEdges(ctx *gin.Context) {
	edges, err := c.store.ListEdges(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, utils.ErrorResponse(err))
		return
	}
	ctx.JSON(http.StatusOK, edges)
}
