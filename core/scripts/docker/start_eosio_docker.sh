#!/usr/bin/env bash
set -o errexit

# Name of the docker container 
CONTAINER_NAME=$1

# Name of the docker image which will be used
IMAGE_NAME=$2

# The port which will be used by nodeos
NODEOS_PORT=$3;

NODEOS_ENVIRONMENT=$4

# OS
IS_DARWIN=$5

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NO_COLOR='\033[0m'

if [ "$IS_DARWIN" = true ] && [ ${NODEOS_ENVIRONMENT} != "test" ]; then
  echo "\n${CYAN}Starting a local EOS node${NO_COLOR}"
  echo "${GREEN}=== DOCKER: CONTAINER ID ===${NO_COLOR}"
fi

if [ "$IS_DARWIN" = false ] && [ ${NODEOS_ENVIRONMENT} != "test" ]; then
  echo ""
  echo "Starting a local EOS node"
  echo "=== DOCKER: CONTAINER ID ==="
fi

if [ ${NODEOS_ENVIRONMENT} != "test" ]
then

    docker run --name ${CONTAINER_NAME} -d \
    -p ${NODEOS_PORT}:${NODEOS_PORT} -p 4949:4949 \
    -w "/opt/eosio/bin/" ${IMAGE_NAME} /bin/bash -c "keosd --http-server-address=0.0.0.0:4949 & nodeos -e -p eosio -d /mnt/dev/data \
  --config-dir /mnt/dev/config \
  --http-validate-host=false \
  --plugin eosio::producer_plugin \
  --plugin eosio::chain_api_plugin \
  --plugin eosio::http_plugin \
  --http-server-address=0.0.0.0:8888 \
  --access-control-allow-origin=* \
  --contracts-console \
  --verbose-http-errors "

    
    
else
    script="sh ./node/init_test_node.sh"

    docker run --name ${CONTAINER_NAME} -d \
    -p ${NODEOS_PORT}:${NODEOS_PORT} -p 4949:4949 \
    --mount type=bind,src="$(pwd)"/node,dst=/opt/eosio/bin/node \
    --mount type=bind,src="$(pwd)"/config,dst=/opt/eosio/bin/config \
    -w "/opt/eosio/bin/" ${IMAGE_NAME} /bin/bash -c "$script"
fi