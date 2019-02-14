const infeos = require('infeos').init();

const EOSIOApi = infeos.EOSIOApi;   
const EOSIORpc = infeos.EOSIOApi.rpc;

describe('Planet Contract Tests', function () {
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

    it('should create a new planet', async () => {
        let starName = 'Lacertra';
        let starType = 'O';
        let color = 'blue';
        let averageMass = 60;
        let averageRadius = 15;

        await universeContractInstance.createstar(starName, starType, color, averageMass, averageRadius);
        let starsTable = await EOSIORpc.get_table_rows({ code: account.name, scope: account.name, table: 'star'});
        let stars = starsTable['rows'];
        let star = stars[stars.length - 1];

        let planetName = 'T10Z';

        await universeContractInstance.createplanet(planetName, star.id);
        let planetsTable = await EOSIORpc.get_table_rows({ code: account.name, scope: account.name, table: 'planet'});
        let planets = planetsTable['rows'];
        let planet = planets[planets.length - 1];

        assert.strictEqual(planet.planet_name, planetName, `Invalid planet name. [${planetName}] was expected but [${planet.planet_name}] was returned.`);
        assert.strictEqual(planet.star_id, star.id, `Invalid star id. [${star.id}] was expected but [${planet.star_id}] was returned.`);
    });
});