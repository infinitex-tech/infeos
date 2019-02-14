#!/usr/bin/env bash

cd "$(dirname "$0")"

# Name of the docker container 
CONTAINER_NAME=$1

# Name of the docker image which will be used
IMAGE_NAME=$2

# The port which will be used by nodeos
NODEOS_PORT=$3;

# Nodeos environment. It can be "main" or "test"
NODEOS_ENVIRONMENT=$4

# OS
IS_DARWIN=$5

# Setup the environment
sh ./init/first_time_setup.sh ${CONTAINER_NAME}

# Start EOSIO docker
sh ./docker/start_eosio_docker.sh ${CONTAINER_NAME} ${IMAGE_NAME} ${NODEOS_PORT} ${NODEOS_ENVIRONMENT} ${IS_DARWIN}

# wait until eosio blockchain to be started
until $(curl --output /dev/null \
             --silent \
             --head \
             --fail \
             localhost:${NODEOS_PORT}/v1/chain/get_info)
do
  sleep 2s
done

