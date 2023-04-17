const API_URL = '/v1'

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`)
  return await response.json()
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`)
  const fetchedLaunches = await response.json()
  return fetchedLaunches.sort((a,b)=>{
    return a.flightnumber - b.flightnumber;
  });
}

async function httpSubmitLaunch(launch) {
  try{
    return await fetch(`${API_URL}/launches`,{
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
    return await fetch(`${API_URL}/launches/${id}`,{
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
    return await fetch(`${API_URL}/history/${id}`,{
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

async function httpGuest() {
  try{
    return await fetch(`${API_URL}/auth/guest`,{
      method: 'GET',
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
  httpDeleteLaunch,
  httpGuest
};