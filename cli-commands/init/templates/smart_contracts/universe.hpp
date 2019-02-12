#include <universe/types.hpp>

#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <string>

using namespace eosio;
using namespace types;

using std::string;
using std::vector;

class [[eosio::contract]] universe : public eosio::contract
{
    using contract::contract;

    public:
    universe(name receiver, name code, datastream<const char *> ds) : 
        contract(receiver, code, ds), 
        stars(receiver, code.value), 
        planets(receiver, code.value) {}

    star_index stars;
    planet_index planets;

    [[eosio::action]]
    void createstar(string star_name, string star_type, string color, uint64_t average_mass, uint64_t average_radius);

    [[eosio::action]]
    void addplanet(uint64_t star_id, uint64_t planet_id);

    [[eosio::action]]
    void createplanet(string planet_name, uint64_t star_id);
};

EOSIO_DISPATCH(universe, (createstar)(addplanet)(createplanet))