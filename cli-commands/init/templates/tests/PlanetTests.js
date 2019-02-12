const infeos = require('infeos').init();

const EOSIOApi = infeos.EOSIOApi;   
const EOSIORpc = infeos.EOSIOApi.rpc;

describe('Star Contract Tests', function () {
    let account;
    let universeContractInstance;
    let isContractDeployed;

    before(async () => {
        let eosioTest = new infeos.EOSIOTest();
        account = eosioTest.deployerAccount;

        if (!isContractDeployed) {
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

        assert.strictEqual(stars[0].star_name, starName, `Invalid star name. [${starName}] was expected but [${stars[0].star_name}] was returned.`);
        assert.strictEqual(stars[0].star_type, starType, `Invalid star type. [${starType}] was expected but [${stars[0].star_type}] was returned.`);
        assert.strictEqual(stars[0].color, color, `Invalid color. [${color}] was expected but [${stars[0].color}] was returned.`);
        assert.strictEqual(stars[0].average_mass, averageMass, `Invalid average mass. [${averageMass}] was expected but [${stars[0].average_mass}] was returned.`);
        assert.strictEqual(stars[0].average_radius, averageRadius, `Invalid average radius. [${averageRadius}] was expected but [${stars[0].average_radius}] was returned.`);
    });

    it('', async () => {

    });
    
    it('', async () => {
        
    });

    it('', async () => {
        
    });

    it('', async () => {
        
    });

    it('', async () => {
        
    });

});