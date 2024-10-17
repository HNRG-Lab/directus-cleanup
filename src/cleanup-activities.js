require('dotenv').config()
const Knex = require('knex')
const knexConfig = require('../knexfile');
const knex = Knex(knexConfig)

const cleanupActivities = async (days) => {
    try {
        const date = new Date();
        date.setDate(date.getDate() - days);

        const chunkSize = parseInt(process.env.DB_ACTIVITIES_DELETE_CHUNK_SIZE, 10) || 5000;
        const dbClient = process.env.DB_CLIENT;

        let deletedRecords = 0;
        do {
            switch (dbClient) {
                case 'mysql':
                    const resultMysql = await knex.raw(`DELETE FROM directus_activity WHERE timestamp < ? LIMIT ?`, [date, chunkSize]);
                    deletedRecords = resultMysql[0].affectedRows || 0;
                    break;
                case 'postgres':
                case 'pg':
                    const resultPg = await knex.raw(`
                        DELETE FROM directus_activity
                        WHERE id IN (
                            SELECT id FROM directus_activity 
                            WHERE timestamp < ? 
                            LIMIT ?
                        )
                    `, [date, chunkSize]);
                    deletedRecords = resultPg.rowCount || 0;
                    break;
                default:
                    console.log(`Unsupported DB_CLIENT: ${dbClient}`);
                    return;
            }

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
