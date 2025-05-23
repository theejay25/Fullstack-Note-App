import express, { json } from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import connectToMongoDB from './db/db.js'


const corsOptions = {
    origin: 'http://localhost:5173'
}



const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/auth', authRouter)

app.get('/me', (req, res) => {
    res.json({
        fruit: ['banana', 'mainia', 'odfbo']
    })
})


app.listen(8080, () => {
    connectToMongoDB()
    console.log('hey GOD IS GREAT TO MEE!!!!!!!!!!!!');
})