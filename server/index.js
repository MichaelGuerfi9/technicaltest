const Koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-body');
const mongoose = require('mongoose')
require('colors')


const app = new Koa();
const router = new Router();

app.use(bodyParser({
    formidable:{uploadDir: './uploads'},
    multipart: true,
    urlencoded: true
 }));

const player = require('./Player.controller')


router.get('/players',player.findAll)
router.get('/player/:id',player.findOne)
router.post('/player',player.create)
router.put('/player/:id',player.update)
router.delete('/player/:id',player.delete)

 app.set('ip', 'localhost')
 app.set('port', 1337)

 // Indique à Mongoose que les promesses à utiliser sont celles par défaut dans Node.js (objet global)
 mongoose.Promise = global.Promise

 // Transformation de la méthode app.listen() d'Express en "Promesse JS"
 const appListen = (app, port, ip) => {
     return new Promise((resolve, reject) => {
         app.listen(port, ip, resolve)
     })
 }

mongoose
.connect('mongodb://localhost:27017/technicalTest', {useMongoClient:true})
.then( () => console.log('MongoDB : Connexion établie'.bgGreen) )
.then( appListen(app, app.get('port'), app.get('ip')) )
.then( () => console.log(` App Started on http://${app.get('ip')}:${app.get('port')} `.bgGreen) )
.catch(err => console.log(err.message.red))