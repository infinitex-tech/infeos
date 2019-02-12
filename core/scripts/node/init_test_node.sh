#!/usr/bin/env bash
set -o errexit

# set PATH
PATH="$PATH:/opt/eosio/bin:/opt/eosio/bin/config"

# Starting a local EOS test node
keosd --http-server-address=0.0.0.0:4949 & nodeos -e -p eosio -d /mnt/dev/data \
  --config-dir /mnt/dev/config \
  --http-validate-host=false \
  --plugin eosio::producer_plugin \
  --plugin eosio::chain_api_plugin \
  --plugin eosio::http_plugin \
  --http-server-address=0.0.0.0:8888 \
  --access-control-allow-origin=* \
  --contracts-console \
  --verbose-http-errors --config /opt/eosio/bin/config/test/config.ini
