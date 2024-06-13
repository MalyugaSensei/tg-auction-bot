#!/bin/bash

echo "Starting containers..."

docker compose up -d --build

EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
    echo "Failed to start containers"
    exit $EXIT_CODE
fi

echo "Containers started"

echo "Staring ngrok..."

ngrok start --all