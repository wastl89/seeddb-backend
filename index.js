/**
 * Module Dependencies
 */
const restify = require('restify');
const mongoose = require('mongoose');
const restifyPlugins = require('restify-plugins');
require('dotenv').config();

/**
  * Initialize Server
  */
const server = restify.createServer({
});


/**
  * Middleware
  */
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());
/**
  * Start Server, Connect to DB & Require Routes
  */
server.listen(process.env.PORT, () => {
    // establish connection to mongodb
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser:true, useUnifiedTopology:true });
    const db = mongoose.connection;
    db.on('error', (err) => {
        console.error(err);
        process.exit(1);
    });
    db.once('open', () => {
        require('./routes')(server);
        console.log(`Server is listening on port ${process.env.PORT}`);
    });
});