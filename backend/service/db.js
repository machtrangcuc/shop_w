const oracledb = require('oracledb');

async function createConnection() {
    try {
        const connection = await oracledb.getConnection({
            user: "admin",
            password: "123456789",
            connectString: "shoppee.c768meqwquyg.ap-southeast-2.rds.amazonaws.com/orcl"
        });

        console.log('Connected to Oracle successfully');
        return connection;
    } catch (err) {
        console.error(err.message);
        return;
    }
}

module.exports = createConnection();