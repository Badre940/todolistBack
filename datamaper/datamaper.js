const client = require('../data/database');

const dataMapper = {
    async createOneUser(obj) {
        const query = {
            text: `INSERT INTO "user" ("email", "password") VALUES ($1, $2) RETURNING *`,
            values: [obj.email, obj.password],
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async getuserFromEmail(email) {
        const query = {
            text: 'SELECT * FROM "user" WHERE "email" = $1',
            values: [email],
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async getOneprofile(id) { // Ensure this function exists
        const query = {
            text: 'SELECT * FROM "user" WHERE "id" = $1',
            values: [id],
        };
        const result = await client.query(query);
        return result.rows[0];
    },

};

module.exports = dataMapper;
