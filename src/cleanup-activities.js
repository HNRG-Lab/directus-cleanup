require('dotenv').config()
const Knex = require('knex')
const knexConfig = require('../knexfile');
const knex = Knex(knexConfig)

const cleanupActivities = async (days) => {
    try {
        const date = new Date();
        date.setDate(date.getDate() - days);

        const chunkSize = parseInt(process.env.DB_ACTIVITIES_DELETE_CHUNK_SIZE, 10) || 5000;
        let deletedRecords;

        do {
            const result = await knex.raw('DELETE FROM directus_activity WHERE timestamp < ? ORDER BY timestamp DESC LIMIT ?', [date, chunkSize]);
            deletedRecords = result[0].affectedRows || 0;
            console.log(`Deleted ${deletedRecords} records`);
        } while (deletedRecords > 0);

        console.log(`Table directus_activity with timestamps before ${date.toISOString()} have been cleaned up successfully.`);
    } catch (error) {
        console.error('Error cleaning up directus_activity table:', error);
    } finally {
        await knex.destroy();
    }
}

module.exports = cleanupActivities;
