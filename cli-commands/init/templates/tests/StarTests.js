const infeos = require('infeos').init();

const EOSIOApi = infeos.EOSIOApi;   
const EOSIORpc = infeos.EOSIOApi.rpc;

describe('Star Contract Tests', function () {
    let eosioTest;
    let account;
    let universeContractInstance;
    let isContractDeployed;

    before(async () => {
        eosioTest = new infeos.EOSIOTest();
        account = eosioTest.deployerAccount;

        /**
         * At the moment you can choose how & when the smart contract will be deployed.
         * We advise you to deploy your contract in the deploy script and to get its instance in the test as the example below
         */
        if (false) {
            /**
             * Deploying the contract if not yet deployed
             */
            let universeContract = new infeos.EOSIODeployer('universe', account);
            universeContractInstance = await universeContract.deploy();

            isContractDeployed = true;
        } else {
            /**
             * Loading already deployed smart contract
             */
            universeContractInstance = new infeos.EOSIOContract('universe', account);
        }
    });

    it('should create a new star', async () => {
        let starName = 'Sirius';
        let starType = 'A';
        let color = 'blue';
        let averageMass = 5;
        let averageRadius = 2;

        await universeContractInstance.createstar(starName, starType, color, averageMass, averageRadius);
        let starsTable = await EOSIORpc.get_table_rows({ code: account.name, scope: account.name, table: 'star'});
        let stars = starsTable['rows'];
        let star = stars[stars.length - 1];

        assert.strictEqual(star.name, starName, `Invalid star name. [${starName}] was expected but [${star.name}] was returned.`);
        assert.strictEqual(star.type, starType, `Invalid star type. [${starType}] was expected but [${star.type}] was returned.`);
        assert.strictEqual(star.color, color, `Invalid color. [${color}] was expected but [${star.color}] was returned.`);
        assert.strictEqual(star.average_mass, averageMass, `Invalid average mass. [${averageMass}] was expected but [${star.average_mass}] was returned.`);
        assert.strictEqual(star.average_radius, averageRadius, `Invalid average radius. [${averageRadius}] was expected but [${star.average_radius}] was returned.`);
    });

    it('should add a new planet to existing star', async () => {
        let starName = 'Antares';
        let starType = 'M';
        let color = 'red';
        let averageMass = 2;
        let averageRadius = 1;

        await universeContractInstance.createstar(starName, starType, color, averageMass, averageRadius);
        let starsTable = await EOSIORpc.get_table_rows({ code: account.name, scope: account.name, table: 'star'});
        let stars = starsTable['rows'];
        let star = stars[stars.length - 1];

        let planetName = 'Earth';

        await universeContractInstance.createplanet(planetName, star.id);
        let planetsTable = await EOSIORpc.get_table_rows({ code: account.name, scope: account.name, table: 'planet'});
        let planets = planetsTable['rows'];
        let planet = planets[planets.length - 1];

        await universeContractInstance.addplanet(star.id, planet.id);
        starsTable = await EOSIORpc.get_table_rows({ code: account.name, scope: account.name, table: 'star'});
        stars = starsTable['rows'];
        star = stars[stars.length - 1];

        assert.isTrue(star.planets_ids.includes(planet.id), `The expected planet id [${planet.id}] was not found in the planets collection [${star.planets_ids}]`)
    });

    it('should throw when adding a non-existing planet to a star', async () => {
        let starName = 'Arcturus';
        let starType = 'K';
        let color = 'orange';
        let averageMass = 1;
        let averageRadius = 1;

        await universeContractInstance.createstar(starName, starType, color, averageMass, averageRadius);
        let starsTable = await EOSIORpc.get_table_rows({ code: account.name, scope: account.name, table: 'star'});
        let stars = starsTable['rows'];
        let star = stars[stars.length - 1];

        let invalidPlanetId = 1111;

        await eosioTest.expectThrow(async () => {
            await universeContractInstance.addplanet(star.id, invalidPlanetId);
        }, 'Expected to throw when adding a non-existing planet');
    });
});
