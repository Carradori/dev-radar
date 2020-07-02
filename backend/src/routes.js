const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');
const routes = Router();

//dev register
routes.post('/devs', DevController.store);
//get all devs
routes.get('/devs', DevController.index);
//search devs 10km and techs
routes.get('/search', SearchController.index);
//update dev
routes.put('/devs/:id', DevController.update);
//delete dev
routes.delete('/devs/:id', DevController.destroy);

module.exports = routes;