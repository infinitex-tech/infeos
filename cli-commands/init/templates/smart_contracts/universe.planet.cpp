using namespace types;

void universe::createplanet(string planet_name, uint64_t star_id)
{
    require_auth(name("infeos"));

    planets.emplace(get_self(), [&](auto &row) {
        row.id = planets.available_primary_key();
        row.name = planet_name;
        row.star_id = star_id;
    });
}