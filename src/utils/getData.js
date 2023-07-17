export async function getData(url){
    const res = await fetch(url,{
    method : 'GET',
    headers : {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
  let data= await res.json();
    return data
}