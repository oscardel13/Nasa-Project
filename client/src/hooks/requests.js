const API_URL = 'http://localhost:8000'

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/v1/planets`)
  return await response.json()
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/v1/launches`)
  const fetchedLaunches = await response.json()
  return fetchedLaunches.sort((a,b)=>{
    return a.flightnumber - b.flightnumber;
  });
}

async function httpSubmitLaunch(launch) {
  try{
    return await fetch(`${API_URL}/v1/launches`,{
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(launch)
    })
  }
  catch(error){
    console.log(error)
    return {ok: false}
  }
}

async function httpAbortLaunch(id) {
  try{
    return await fetch(`${API_URL}/v1/launches/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json"
      },
    })
  }
  catch(error){
    console.log(error)
    return {ok: false}
  }
}

async function httpDeleteLaunch(id) {
  try{
    return await fetch(`${API_URL}/v1/history/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json"
      },
    })
  }
  catch(error){
    console.log(error)
    return {ok: false}
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
  httpDeleteLaunch
};