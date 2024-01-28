export async function sendRequest({url,method,host}){
    const res = await fetch(url, {
    method,
    headers:{
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': host
    },
    })
    return res;
}