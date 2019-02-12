FROM ubuntu:18.04

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y wget curl

RUN wget https://github.com/EOSIO/eos/releases/download/v1.6.0/eosio_1.6.0-1-ubuntu-18.04_amd64.deb

RUN apt-get install ./eosio_1.6.0-1-ubuntu-18.04_amd64.deb -y

RUN wget https://github.com/EOSIO/eosio.cdt/releases/download/v1.5.0/eosio.cdt_1.5.0-1_amd64.deb

RUN apt-get install ./eosio.cdt_1.5.0-1_amd64.deb -y
