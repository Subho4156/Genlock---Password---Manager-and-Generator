import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'

import authRoutes from './routes/auth.js'
import passwordRoutes from './routes/passwords.js'

dotenv.config()
const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/passwords', passwordRoutes)

if(process.env.NODE_ENV=== "production"){
    app.use(express.static(path.join(__dirname, "/Frontend/dist")));

    app.get(/(.*)/ ,(req,res)=> {
        res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
    })
}

// Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
