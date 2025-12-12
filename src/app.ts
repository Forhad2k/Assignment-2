import express from "express"
import  initDB  from "./config/db.js"
import { vehicleRouter } from "./modules/Vehicles/vehicle.route.js"
import { authRouter } from "./modules/auth/auth.route.js"
import { UserRouter } from "./modules/users/user.route.js"
import { bookingRouter } from "./modules/booking/booking.route.js"


const app = express()
app.use(express.json())

initDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/v1/vehicles", vehicleRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bookings", bookingRouter);

export default app
