using namespace types;

void universe::createstar(string star_name, string star_type, string color, uint64_t average_mass, uint64_t average_radius)
{
    require_auth(name("universe"));

    stars.emplace(get_self(), [&](auto &row) {
        row.id = stars.available_primary_key();
        row.name = star_name;
        row.type = star_type;
        row.color = color;
        row.average_mass = average_mass;
        row.average_radius = average_radius;
    });
}

void universe::addplanet(uint64_t star_id, uint64_t planet_id)
{
    require_auth(name("universe"));

    auto starIterator = stars.find(star_id);
    eosio_assert(starIterator != stars.end(), "Star not found!");

    auto planetIterator = planets.find(planet_id);
    eosio_assert(planetIterator != planets.end(), "Planet not found!");

    stars.modify(starIterator, get_self(), [&](auto &row) {
        row.planets_ids.push_back(planet_id);
    });
}