#!/usr/bin/env bash

PATH_TO_WASM_FILE=$1
PATH_TO_MASTER_CONTRACT=$2
MASTER_CONTRACT_NAME=$3
SHOULD_GENERATE_ABI=$4

CONTAINER_NAME=$5

CONTRACTS_FOLDER_PATH_IN_CONTAINER=$6
PATH_TO_WASM_FILE_IN_HOST=$7
PATH_TO_ABI_FILE_IN_HOST=$8
PATH_TO_ABI_FILE_IN_CONTAINER=$9

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NO_COLOR='\033[0m'

# Generating WASM file for the master contract 
sleep 1s

if [ "$SHOULD_GENERATE_ABI" = false ] ; then
    # Copy the contracts folder inside the container
    docker cp contracts $CONTAINER_NAME:$CONTRACTS_FOLDER_PATH_IN_CONTAINER

    echo "\n${CYAN}Generating WASM for ${RED}${MASTER_CONTRACT_NAME}${CYAN} smart contract${NO_COLOR}"
    docker exec $CONTAINER_NAME eosio-cpp -I ./contracts/include -o $CONTRACTS_FOLDER_PATH_IN_CONTAINER/$PATH_TO_WASM_FILE $CONTRACTS_FOLDER_PATH_IN_CONTAINER/$PATH_TO_MASTER_CONTRACT

    # Copy the generated WASM file back to the project build folder
    docker cp $CONTAINER_NAME:$CONTRACTS_FOLDER_PATH_IN_CONTAINER/$PATH_TO_WASM_FILE $PATH_TO_WASM_FILE_IN_HOST
fi

if [ "$SHOULD_GENERATE_ABI" = true ] ; then
    # Copy the contracts folder inside the container
    docker cp contracts $CONTAINER_NAME:$CONTRACTS_FOLDER_PATH_IN_CONTAINER

    echo "\n${CYAN}Generating WASM & ABI for ${RED}${MASTER_CONTRACT_NAME}${CYAN} smart contract${NO_COLOR}"
    docker exec $CONTAINER_NAME eosio-cpp -I /contracts/include -o $CONTRACTS_FOLDER_PATH_IN_CONTAINER/$PATH_TO_WASM_FILE $CONTRACTS_FOLDER_PATH_IN_CONTAINER/$PATH_TO_MASTER_CONTRACT --abigen

    # Copy the generated WASM & ABI files back to the project build folder
    docker cp $CONTAINER_NAME:$CONTRACTS_FOLDER_PATH_IN_CONTAINER/$PATH_TO_WASM_FILE $PATH_TO_WASM_FILE_IN_HOST
    docker cp $CONTAINER_NAME:$PATH_TO_ABI_FILE_IN_CONTAINER/ $PATH_TO_ABI_FILE_IN_HOST
fi

sleep 1s
# Moving outside the contracts folder
cd ..
