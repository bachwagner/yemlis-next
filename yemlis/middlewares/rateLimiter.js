import { NextResponse } from "next/server";

const rateLimitMap = new Map();
console.log("map file")
export default function rateLimitMiddleware(handler) {
  return (req, res) => {
    console.log("rate limiterr")
    const ip = req.headers.get("x-forwarded-for") || req.connection?.remoteAddress;  // to check req.connection.remoteAddress
    const limit = 200; // Limiting requests to 5 per minute per IP
    const windowMs = 60 * 1000; // 1 minute
    console.log("your ip iss")
    console.log(ip)
    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, {
        count: 0,
        lastReset: Date.now(),
      });
    }

    const ipData = rateLimitMap.get(ip);

    if (Date.now() - ipData.lastReset > windowMs) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
    }

    if (ipData.count >= limit) {
      console.log("limit exceeed")
      const response = new NextResponse(`<html> 
              <h1>Hata: 4299</h1>
              <h2>Sunucuya çok fazla istek gönderdiniz</h2>
              <p>Bir süre bekleyip tekrar deneyiniz</p>
          </html>`, { status: 429, headers: { 'content-type': 'text/html' } });
      response.headers.set('Content-Type', 'text/html; charset=utf-8');
    
      return response;

      /* return Response.json(
        { success: false, message: 'Too Many Requestt ' },
        { status: 429 }
      )   */

    }

    ipData.count += 1;
  console.log("rate limiter allowed")
    return handler(req, res);
  };
}