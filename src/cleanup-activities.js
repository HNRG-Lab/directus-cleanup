const Knex = require('knex')
const knexConfig = require('../knexfile');
const knex = Knex(knexConfig)

const cleanupActivities = async (days) => {
    try {
        const date = new Date();
        date.setDate(date.getDate() - days);

        const chunkSize= 5000;
        let deletedRecords;

        do {
            try {
                deletedRecords = await knex('directus_activity')
                    .where('timestamp', '<', date)
                    .orderBy('timestamp')
                    .limit(chunkSize)
                    .del();

                console.log(`Deleted ${deletedRecords} records`);
            } catch (error) {
                console.error('Error deleting records:', error);
                break;
            }
        } while (deletedRecords > 0);

        console.log(`Table directus_activity with timestamps before ${date.toISOString()} have been cleaned up successfully.`);
    } catch (error) {
        console.error('Error cleaning up directus_activity table:', error);
    } finally {
        await knex.destroy();
    }
}

module.exports = cleanupActivities;
