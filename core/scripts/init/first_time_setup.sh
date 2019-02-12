#!/usr/bin/env bash
set -o errexit

# Name of the docker container 
CONTAINER_NAME=$1

# Check if all dependencies are available (Docker & Node.js)
if [ ! -x "$(command -v docker)" ] ||
   [ ! -x "$(command -v node)" ]; then
    echo ""
    echo -e "\033[0;31m[Error with Exception]\033[0m"
    echo "Please make sure Docker and Node.js are installed"
    echo ""
    echo "Install Docker: https://www.docker.com/get-started"
    echo "Install Node.js: https://nodejs.org/en/"
    echo ""
    exit
fi

# Removing the previous EOSIO container if it exists
docker stop ${CONTAINER_NAME} 2>/dev/null || true && docker rm --force ${CONTAINER_NAME} 2>/dev/null || true 

# Creating a clean data folder in the eosio_docker to preserve block data
# rm -rf "./docker/eosio_docker/data" 2>/dev/null
# mkdir -p "./docker/eosio_docker/data" 2>/dev/null
