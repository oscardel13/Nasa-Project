const http = require('http');

const app = require('./app');

require('dotenv').config();

const { mongoConnect } = require('./services/mongo');

const { loadPlanetsData } = require('./models/plantes.models')
const { loadLaunchData } = require('./models/launches.models')

const PORT = process.env.PORT || 8000;


const server = http.createServer(app)

async function startServer() {
    await mongoConnect()
    await loadPlanetsData();
    await loadLaunchData();
}

server.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`)
})

startServer();

