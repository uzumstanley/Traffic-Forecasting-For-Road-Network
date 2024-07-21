#!/bin/sh

export GIN_MODE=release
export PORT=8080
export ENV=production

# Start your application
exec "$@"
