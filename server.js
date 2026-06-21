import express from 'express'
import dotenv from 'dotenv'
import contactRoutes from './routes/contactRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {errorHandler} from "./middleware/errorHandler.js";
import connectDB from "./config/dbConnectios.js";

const app = express()
dotenv.config()

connectDB()
const port = process.env.port

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/contacts", contactRoutes)
app.use("/api/users", userRoutes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})