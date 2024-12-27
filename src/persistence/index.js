if (process.env.MYSQL_HOST) {
    console.log('Using MySQL persistence.');
    module.exports = require('./mysql');
} else {
    console.warn('MYSQL_HOST is not set. Falling back to SQLite.');
    module.exports = require('./sqlite');
}