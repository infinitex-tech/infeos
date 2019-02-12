#!/usr/bin/env bash

PATH_TO_WASM_FILE=$1
PATH_TO_MASTER_CONTRACT=$2
MASTER_CONTRACT_NAME=$3
SHOULD_GENERATE_ABI=$4

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NO_COLOR='\033[0m'

# Moving inside the contracts folder
cd contracts/

# Generating WASM file for the master contract 
sleep 1s

if [ "$SHOULD_GENERATE_ABI" = false ] ; then
    echo "\n${CYAN}Generating WASM for ${RED}${MASTER_CONTRACT_NAME}${CYAN} smart contract${NO_COLOR}"
    eosio-cpp -I include -o $PATH_TO_WASM_FILE $PATH_TO_MASTER_CONTRACT
fi

if [ "$SHOULD_GENERATE_ABI" = true ] ; then
    echo "\n${CYAN}Generating WASM & ABI for ${RED}${MASTER_CONTRACT_NAME}${CYAN} smart contract${NO_COLOR}"
    eosio-cpp -I include -o $PATH_TO_WASM_FILE $PATH_TO_MASTER_CONTRACT --abigen
fi

sleep 1s
# Moving outside the contracts folder
cd ..
