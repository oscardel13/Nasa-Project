const { getAllLaunches, addNewLaunch, abortLaunch, existsLaunchWithId } = require('../../models/launches.models');

const { getPagination } = require('../../services/query');

async function httpGetAllLaunches(req,res) {
    const { skip, limit } = getPagination(req.query)
    const launches = await getAllLaunches(skip, limit)
    return res.status(200).json(launches)
}

async function httpAddNewLaunch({ body },res) {
    if (!body.launchDate || !body.mission || !body.rocket || !body.target){
        return res.status(400).json({error:"missing parameters"})
    }
    const newLaunch = {
        launchDate :new Date(body.launchDate),
        mission : body.mission,
        rocket: body.rocket,
        target: body.target,
    }
    if (isNaN(newLaunch.launchDate)){
        return res.status(400).json({error:"Invalid Launch Date"})
    }
    const addNewLaunchRes = await addNewLaunch(newLaunch)
    return res.status(201).json(newLaunch)
}

async function httpAbortLaunch(req, res){
    const flightNumber = Number(req.params.id);
    const launchExist = await existsLaunchWithId(flightNumber)
    if (launchExist){
        const abortLaunchRes = await abortLaunch(flightNumber)
        console.log(abortLaunchRes)
        if (!abortLaunchRes) return res.status(400).json({error: "launch not aborted"})
        return res.status(200).json({ok: true})
    }
    else{
        res.status(404).json({error: "launch not found"})
    }

}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
    
}