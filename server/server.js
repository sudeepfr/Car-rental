import express from 'express'
import "dotenv/config";
import cors from 'cors'
import mongoDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

const app=express();
app.use(express.json());
app.use(cors());

mongoDB();

app.get('/',(req,res)=>{
     res.send("Server is live!");
})
app.use('/api/user',userRouter);
app.use('/api/owner',ownerRouter);
app.use('/api/bookings',bookingRouter);
const PORT=process.env.PORT||3000
 
app.listen(PORT,()=>{
     console.log("Server is running at "+PORT);
})

