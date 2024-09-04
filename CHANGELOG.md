# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2] - 2024-09-04
### Added
- Add MySQL dependency
### Changed
- Fixed exception handling

## [1.1.1] - 2024-07-26
### Changed
- Refactored `cleanupActivities.js` to use raw SQL query for deleting records in chunks, ensuring proper handling of `LIMIT` with `DELETE` in MySQL.

## [1.1.0] - 2024-07-25
### Added
- Implemented chunked deletion of records in the `directus_activity` table, processing records in batches of 5000 to improve performance and reduce load on the database.

## [1.0.0] - 2024-07-17
### Added
- Initial release of the project.
