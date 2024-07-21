# Golang build stage
FROM golang:alpine3.19 AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

# Final stage
FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/main /app/main
COPY config.env /app/
COPY startup.sh /app/
RUN chmod +x /app/main
RUN chmod +x /app/startup.sh
EXPOSE 8080
ENV ENV=production
ENV PORT=8080
ENV GIN_MODE=release
CMD ["./main"]
ENTRYPOINT ["./startup.sh"]
