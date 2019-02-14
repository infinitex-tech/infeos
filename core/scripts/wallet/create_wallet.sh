#!/usr/bin/env bash

# Name of the container
CONTAINER_NAME=$1

# Nodeos endpoint
NODEOS_ENDPOINT=$2

# The http/https URL where keosd is running
KEOSD_ENDPOINT=$3

# Name of the wallet
WALLET_NAME=$4

# OS
IS_DARWIN=$5

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NO_COLOR='\033[0m'

# Creating a new default wallet
sleep 2s

if [ "$IS_DARWIN" = true ] ; then
  echo "\n${CYAN}Creating a default wallet: ${RED}${WALLET_NAME}${NO_COLOR}"
  echo "${GREEN}=== EOSIO OUTPUT ===${NO_COLOR}"
fi

if [ "$IS_DARWIN" = false ] ; then
  echo "\rCreating a default wallet: ${WALLET_NAME}"
  echo "=== EOSIO OUTPUT ==="
fi

docker exec $CONTAINER_NAME cleos --url $NODEOS_ENDPOINT --wallet-url $KEOSD_ENDPOINT wallet create -n $WALLET_NAME --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > ${WALLET_NAME}_wallet_password.txt

