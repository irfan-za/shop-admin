import { NextResponse } from 'next/server';
 
export async function POST(req) {
  const reqBody= await req.json();
  const res = await fetch(`${process.env.API_URL}/api/auth/update-token`,{
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'X-ACCESS-TOKEN': `${reqBody.access_token}`,
      'X-REFRESH-TOKEN': `${reqBody.refresh_token}`,
    }
  });
  const data = await res.json();

  return NextResponse.json({
    access_token : data.data.access_token,
    refresh_token : data.data.refresh_token
  })
}