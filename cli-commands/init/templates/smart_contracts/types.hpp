#pragma once

#include <eosiolib/eosio.hpp>
#include <string>
#include <vector>

using namespace eosio;

using std::string;
using std::vector;

namespace types
{
    struct [[eosio::table]] star 
    {
        uint64_t id;
        string name;
        string type;
        string color;
        uint64_t average_mass;
        uint64_t average_radius;
        vector<uint64_t> planets_ids;

        uint64_t primary_key() const { return id; }
    };

    typedef multi_index<"star"_n, star> star_index;


    struct [[eosio::table]] planet
    {
        uint64_t id;
        string name;
        uint64_t star_id;

        uint64_t primary_key() const { return id; }
    };

    typedef multi_index<"planet"_n, planet> planet_index;
}