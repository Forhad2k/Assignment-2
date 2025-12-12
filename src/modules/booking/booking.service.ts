import { pool } from "../../config/db";


 const createBooking = (payload: Record<string, unknown>) => {
   const {customer_id, vehicle_id, rent_start_date, rent_end_date} = payload;
   const result = pool.query(
     "INSERT INTO Bookings (customer_id, vehicle_id, rent_start_date, rent_end_date) VALUES ($1, $2, $3, $4) RETURNING *",
     [customer_id, vehicle_id, rent_start_date, rent_end_date]
   );
   return result;

 }
const getBookings = () => {
    const result = pool.query("SELECT * FROM Bookings");
    return result;
}
const updateBooking = (bookingId : string, payload: Record<string, unknown> ) => {
    const {rent_start_date, rent_end_date} = payload;
    const result = pool.query("UPDATE Bookings SET rent_start_date=$1, rent_end_date=$2  WHERE id=$3 RETURNING *",[rent_start_date,rent_end_date, bookingId ]);
    return result;
}
export const bookingService = {
    createBooking,
    getBookings,
    updateBooking
};
