/**
 * Model Schema
 */
const Seed = require('../models/seed');

module.exports = function(server) {
    server.get('/seed', (req, res, next) => {

        let limit = parseInt(req.query.limit, 10) || 10, // default limit to 10 docs
        skip  = parseInt(req.query.skip, 10) || 0, // default skip to 0 docs
        query = req.query || {}

        // remove skip and limit from query to avoid false querying
        delete query.skip
        delete query.limit

        Seed.find(query).skip(skip).limit(limit)
            .then(users => {
                res.send(200, users)
                next()
            })
            .catch(err => {
                res.send(500, err)
            })
    });

    /**
     * GET
     */
    server.get('/seed/:seed_id', (req, res, next) => {
        Seed.findById(req.params.seed_id)
			.then(user => {
				res.send(200, user)
				next()
			})
			.catch(err => {
				res.send(500, err)
			})
    });

    /**
     * POST
     */
    server.post('/seed', (req, res, next) => {

    	let data = Object.assign({}, { userId: req.params.userId }, req.body) || {}

		Seed.create(req.body)
			.then(task => {
				res.send(200, task)
				next()
			})
			.catch(err => {
				res.send(500, err)
            })
    })
    
    
};
