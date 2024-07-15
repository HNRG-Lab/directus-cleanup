const Knex = require('knex')
const knexConfig = require('../knexfile');
const knex = Knex(knexConfig)

const cleanupActivities = async (days) => {
    try {
        const date = new Date();
        date.setDate(date.getDate() - days);

        await knex('directus_activity').where('timestamp', '<', date).del();
        console.log(`Table directus_activity with timestamps before ${date.toISOString()} have been cleaned up successfully.`);
    } catch (error) {
        console.error('Error cleaning up directus_activity table:', error);
    } finally {
        await knex.destroy();
    }
}

module.exports = cleanupActivities;
