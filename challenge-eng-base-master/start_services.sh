#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$SCRIPT_DIR"

echo "Stopping containers"
docker-compose down -v

echo "Launching new containers"
docker-compose up --build -d

docker-compose exec backend flask load-movielens
