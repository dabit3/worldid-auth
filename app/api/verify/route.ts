import { NextResponse, NextRequest } from "next/server"

export async function POST(req:NextRequest) {
  const body = await req.json()
  const reqBody = {
    merkle_root: body.merkle_root,
    nullifier_hash: body.nullifier_hash,
    proof: body.proof,
    verification_level: body.verification_level,
    signal: body.signal ?? "",
    action: 'auth'
  }

  const verifyRes = await fetch(`https://developer.worldcoin.org/api/v1/verify/${process.env.NEXT_PUBLIC_WLD_APP_ID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody)
  })
  const wldResponse = await verifyRes.json()

  console.log('wldResponse: ', wldResponse)

  if (verifyRes.status == 200) {
    return NextResponse.json({ code: "success" });
  } else {
    return NextResponse.json({ code: "failure" });
  }
  
}