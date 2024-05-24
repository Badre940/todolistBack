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
    async createTask(task) {
        const query = {
            text: `INSERT INTO "task" ("userId", "description") VALUES ($1, $2) RETURNING *`,
            values: [task.userId, task.description],
        };
        const result = await client.query(query);
        return result.rows[0];
    },
    

    async getTasks(userId) {
        const query = {
            text: `SELECT * FROM "task" WHERE "userId" = $1 ORDER BY "created_at" DESC`,
            values: [userId],
        };
        const result = await client.query(query);
        return result.rows;
    },

    // Pour supprimer une tâche
    async deleteTask(taskId) {
        const query = {
            text: `DELETE FROM "task" WHERE "id" = $1 RETURNING *`,
            values: [taskId],
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    // Pour mettre à jour une tâche
    async updateTask(taskId, updates) {
        const query = {
            text: `UPDATE "task" SET "description" = $1, "completed" = $2, "updated_at" = NOW() WHERE "id" = $3 RETURNING *`,
            values: [updates.description, updates.completed, taskId],
        };
        const result = await client.query(query);
        return result.rows[0];
    },

};

module.exports = dataMapper;
