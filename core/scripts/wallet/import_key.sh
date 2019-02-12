#!/usr/bin/env bash

# Name of the container
CONTAINER_NAME=$1

# Nodeos endpoint
NODEOS_ENDPOINT=$2

# The http/https URL where keosd is running
KEOSD_ENDPOINT=$3

# The private key which will be imported to the wallet. It's used only for local development environment
PRIVATE_KEY=$4

# Name of the wallet
WALLET_NAME=$5 

# Flag to execute the command silent
IS_SILENT=$6

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NO_COLOR='\033[0m'

if [ $IS_SILENT != "yes" ]
then

# Importing private key to wallet
sleep 1s 
echo "\n${CYAN}Importing eosio private key (only for development environment) to wallet: ${RED}${WALLET_NAME}${NO_COLOR}"
echo "${GREEN}=== EOSIO OUTPUT ===${NO_COLOR}"
docker exec $CONTAINER_NAME cleos --url $NODEOS_ENDPOINT --wallet-url $KEOSD_ENDPOINT wallet import --private-key $PRIVATE_KEY -n $WALLET_NAME

else

# Importing private key to wallet
docker exec $CONTAINER_NAME cleos --url $NODEOS_ENDPOINT --wallet-url $KEOSD_ENDPOINT wallet import --private-key $PRIVATE_KEY -n $WALLET_NAME 2>/dev/null

fi

