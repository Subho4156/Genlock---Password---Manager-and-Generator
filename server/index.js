import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'

import authRoutes from './routes/auth.js'
import passwordRoutes from './routes/passwords.js'
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config()
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/passwords', passwordRoutes)

if(process.env.NODE_ENV=== "production"){
    app.use(express.static(path.join(__dirname, "/client/dist")));

    app.get(/(.*)/ ,(req,res)=> {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    })
}

// Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
