#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <string>

namespace Multiverse {
    using namespace eosio;
    using std::string;

    class universe : public contract {
        using contract::contract;

        public:
            universe(name receiver, name code, datastream<const char *> ds) : contract(receiver, code, ds){}

            [[eosio::action]]
            void create(uint64_t universeId, string& universeName);

            [[eosio::action]]
            void get(uint64_t universeId);

            struct [[eosio::table]] universe {
                uint64_t universeId;
                string universeName;

                uint64_t primary_key() const { return universeId; }
            };

            typedef multi_index<"universe"_n, universe> universeIndex;
    };

    EOSIO_DISPATCH(universe, (create)(get));
}