import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from "url";
import route from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables
dotenv.config({
  path: path.resolve(__dirname, '../.env')   // this is correct for your folder structure
});

const app = express();
app.use(express.json());

// CORS Setup
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  "http://localhost:3011",
  "http://localhost:3000",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Register routes
route(app);

export default app;