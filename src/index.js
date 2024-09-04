#!/usr/bin/env node
require('dotenv').config()
const { Command } = require('commander');
const cleanupActivities = require('./cleanup-activities')

const program = new Command();

program
    .version('1.0.0')
    .description('A CLI tool to clean up Directus activities');

program
    .command('cleanup-activities')
    .alias('activities')
    .description('Cleanup directus_activity table')
    .option('-d, --days <days>', 'Keep directus activities within the last specified days')
    .action(async (cmd) => {
        const days = parseInt(cmd.days || process.env.DB_ACTIVITIES_RETENTION_DAYS, 10);

        if (!days || isNaN(days)) {
            console.error('Error: The --days option or DB_ACTIVITIES_RETENTION_DAYS environment variable is required and must be a number.');
            process.exit(1);
        }

        await cleanupActivities(days);
    });

program.parse(process.argv);
