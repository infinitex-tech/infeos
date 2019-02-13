#!/usr/bin/env bash

cd "$(dirname "$0")"

# Name of the docker container 
CONTAINER_NAME=$1

# Name of the docker image which will be used
IMAGE_NAME=$2

# The port which will be used by nodeos
NODEOS_PORT=$3;

# Nodeos environment. It can be "main" or "test"
KEOSD_PORT=$4

# Setup the environment

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

# Start EOSIO docker

    echo "\n${CYAN}Starting a local EOS node${NO_COLOR}"
    echo "${GREEN}=== DOCKER: CONTAINER ID ===${NO_COLOR}"
    docker run --name ${CONTAINER_NAME} -d \
    -p ${NODEOS_PORT}:${NODEOS_PORT} -p ${KEOSD_PORT}:${KEOSD_PORT} \
    ${IMAGE_NAME} //bin/bash -c "keosd --http-server-address=0.0.0.0:${KEOSD_PORT} & nodeos -e -p eosio -d /mnt/dev/data \
  --config-dir /mnt/dev/config \
  --http-validate-host=false \
  --plugin eosio::producer_plugin \
  --plugin eosio::chain_api_plugin \
  --plugin eosio::http_plugin \
  --http-server-address=0.0.0.0:${NODEOS_PORT} \
  --access-control-allow-origin=* \
  --contracts-console \
  --verbose-http-errors"

# wait until eosio blockchain to be started
until $(curl --output /dev/null \
             --silent \
             --head \
             --fail \
             localhost:${NODEOS_PORT}/v1/chain/get_info)
do
  sleep 2s
done

