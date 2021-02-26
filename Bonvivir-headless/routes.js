const routes = module.exports = require('next-routes')()

routes
.add('notas', '/:anio/:mes/:dia/:slug', 'Wordpress')