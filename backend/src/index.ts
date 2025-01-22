import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
