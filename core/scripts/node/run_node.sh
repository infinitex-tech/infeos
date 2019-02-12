# Name of the docker container 
CONTAINER_NAME=$1

# Name of the docker image which will be used
IMAGE_NAME=$2

CONFIG_DIR=$3

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NO_COLOR='\033[0m'

echo "\n${CYAN}Starting a local EOS node${NO_COLOR}"
echo "${GREEN}=== DOCKER: CONTAINER ID ===${NO_COLOR}"

docker run --name $CONTAINER_NAME \
  --publish 4949:4949 \
  --publish 127.0.0.1:3998:3998 \
  --detach $IMAGE_NAME \
  /bin/bash -c \
  "exec keosd --http-server-address=0.0.0.0:4949 & exec nodeos -e -p eosio --plugin eosio::producer_plugin --plugin eosio::chain_api_plugin --plugin eosio::history_plugin --plugin eosio::history_api_plugin --plugin eosio::http_plugin -d /mnt/dev/data --config-dir /mnt/dev/config --http-server-address=0.0.0.0:3998 --access-control-allow-origin=* --contracts-console --http-validate-host=false --filter-on='*'"

echo "\n${RED}======= Setting up the node =======${NO_COLOR}"
# shopt -s expand_aliases
# alias cleos="docker exec -it dev_EOS_node cleos --url http://127.0.0.1:3998 --wallet-url http://127.0.0.1:4949"
