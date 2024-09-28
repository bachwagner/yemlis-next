// middleware/rateLimit.js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 dakika
  max: 1, // Her IP için 15 dakikada maksimum 100 isteğe izin ver
  message: "Too many requests from this IP, please try again later."
});

export default limiter;
