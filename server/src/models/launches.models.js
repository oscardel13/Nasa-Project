const axios = require('axios');

const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const launch = {
    flightNumber : 100, //flight_number
    launchDate : new Date('December 27, 2030'), //date_local
    mission : "Kepler Exploration X", //name
    rocket: "Explorer IS1", //rocket.name
    target: "Kepler-442 b", //not applicable
    customers: ["ZTM", 'NASA'], //payload.customers for each payload
    upcoming: true, // upcoming
    success: true //success
}

saveLaunch(launch)

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query"

async function populateLaucnhes(){
    console.log('Downloading Launch Data...')
    const body = {
        query: {},
        options: {
            pagination : false,
            populate: [
            {
                path: "rocket",
                select:{
                    name: 1
                }
            },
            {
                path: 'payloads',
                select: {
                    customers: 1
                }
            }
        ]
    }
    }
    const spacexResponse = await axios.post(SPACEX_API_URL, body);
    const launchDocs = spacexResponse.data.docs;

    if (spacexResponse.status !== 200){
        console.log("Problem downloading launch data");
        throw new Error('Launch data download failed')
    }

    for (const launchDoc of launchDocs){
        const payloads = launchDoc['payloads']
        const customers = payloads.flatMap((payload)=>payload['customers'])


        const launch = {
            flightNumber: launchDoc['flight_number'],
            launchDate: launchDoc['date_local'],
            mission : launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            // target: "Kepler-442 b", //not applicable
            customers: customers,
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success']
        }
        console.log(`${launch.flightNumber}: ${launch.mission}`)
        await saveLaunch(launch);

    }
}

async function loadLaunchData(){
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat'
    });
    if (firstLaunch){
        console.log('Launch Data already loaded') 
    }
    else{
        populateLaucnhes()
    }
    
}

async function findLaunch(filter){
    return await launches.findOne(filter)
}

async function getLatestFlightNumnber() {
    const latestLaunch = await launches.findOne({}).sort('-flightNumber')
    if (!latestLaunch) return 100
    return latestLaunch.flightNumber
}

async function getAllLaunches(skip, limit) {
    return await launches.find({},"-_id -__v").skip(skip).limit(limit).sort("flightNumber")
}

async function saveLaunch(launch){
    await launches.findOneAndUpdate(
        {flightNumber: launch.flightNumber},
        launch, 
        {upsert:true})
}

async function addNewLaunch(newLaunch){
    const planet = await planets.findOne({keplerName: newLaunch.target})
    if (!planet){
        throw new Error("No matching planet found");
    }
    newLaunch = {...newLaunch, 
        flightNumber : await getLatestFlightNumnber()+1,
        customers: ["ZTM", 'NASA'],
        upcoming: true,
        success: true
    }
    await saveLaunch(newLaunch)
    return {newLaunch}  

    
}

async function existsLaunchWithId(launchId){
    return await findLaunch({flightNumber: launchId})
}

async function abortLaunch(flightNumber){
    try{
        const aborted = await launches.updateOne({flightNumber: flightNumber},{upcoming:false,success:false})
        return aborted.modifiedCount === 1;
    }
    catch{
        return {success: false, error: "could not abort"}
    }   
}

async function forceDelete(launchId){
    try{
        const launchDel = launches.deleteOne({flightNumber: launchId})
        return launchDel
    }
    catch{
        return {success: false, error: "could not delete"}
    }
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
    existsLaunchWithId,
    forceDelete,
    loadLaunchData
}