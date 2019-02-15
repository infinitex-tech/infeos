#!/usr/bin/env bash

# Name of the container
CONTAINER_NAME=$1

# Nodeos endpoint
NODEOS_ENDPOINT=$2

# The http/https URL where keosd is running
KEOSD_ENDPOINT=$3

# Name of the account which will be created
ACCOUNT_NAME=$4

# Owner & Active keys
OWNER_PUBLIC_KEY=$5
ACTIVE_PUBLIC_KEY=$6

# Flag to execute the command silent
IS_SILENT=$7

# OS
IS_DARWIN=$8

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NO_COLOR='\033[0m'

if [ "$IS_DARWIN" = true ] && [ $IS_SILENT != "yes" ] ; then
  echo "\n${CYAN}Creating deployer account: ${RED}${DEFAULT_ACCOUNT_NAME}${NO_COLOR}"
  echo "${GREEN}=== EOSIO OUTPUT ===${NO_COLOR}"
fi

if [ "$IS_DARWIN" = false ] && [ $IS_SILENT != "yes" ] ; then
  echo ""
  echo "Creating deployer account: ${DEFAULT_ACCOUNT_NAME}"
  echo "=== EOSIO OUTPUT ==="
fi

if [ $IS_SILENT != "yes" ]
then
 
sleep 1s
docker exec $CONTAINER_NAME cleos --url $NODEOS_ENDPOINT --wallet-url $KEOSD_ENDPOINT create account eosio $ACCOUNT_NAME $OWNER_PUBLIC_KEY $ACTIVE_PUBLIC_KEY 

else

docker exec $CONTAINER_NAME cleos --url $NODEOS_ENDPOINT --wallet-url $KEOSD_ENDPOINT create account eosio $ACCOUNT_NAME $OWNER_PUBLIC_KEY $ACTIVE_PUBLIC_KEY 2>/dev/null

fi



