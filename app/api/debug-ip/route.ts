import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  
  return NextResponse.json({ 
    your_ip: ip,
    message: "Lütfen 'your_ip' karşısındaki değeri geliştiriciye iletin." 
  });
}
