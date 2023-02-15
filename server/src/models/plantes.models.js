const { parse } = require("csv-parse");
const fs = require('fs')

const planets = require('./planets.mongo');

function isHabitiablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}
function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream('data/kepler_data.csv')
        .pipe(parse({
        comment: '#',
        columns: true
        }))
        .on('data', async (data) => {
            if (isHabitiablePlanet(data)){
                await savePlanet(data)
            }
        })
        .on('error', (err) =>{
            console.log(err)
            reject(err);
        })
        .on('end', async () =>{
            const countPlanetsFound = await planets.count({})
            console.log(`${countPlanetsFound} habitable planets found!`);
            resolve();
        });
    });
}

async function savePlanet(planet){
    try{
        await planets.updateOne({
            keplerName: planet.kepler_name
        }, {keplerName: planet.kepler_name}, {upsert: true});
    }
    catch(err){
        console.error(`could not save a planet: ${err}`)
    }
}

async function getAllPlanets(){
    return await planets.find({},{_id: 0, __v: 0});
}

module.exports = {
    loadPlanetsData,
    getAllPlanets
}