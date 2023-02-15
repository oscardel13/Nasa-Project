const { forceDelete, existsLaunchWithId } = require('../../models/launches.models');

async function httpDeleteLaunch(req, res){
    const flightNumber = Number(req.params.id);
    const launchExist = await existsLaunchWithId(flightNumber)
    if (launchExist){
        const deleteLaunchRes = await forceDelete(flightNumber)
        if (!deleteLaunchRes) return res.status(400).json({error: "launch not aborted"})
        return res.status(200).json({ok: true})
    }
    else{
        res.status(404).json({error: "launch not found"})
    }
    
}

module.exports = {
    httpDeleteLaunch
}