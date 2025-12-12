import { Request, Response } from "express";
import { bookingService } from "./booking.service";


const createBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.createBooking(req.body);
        res.status(201).json({
            message: "Booking created successfully",
            data: result.rows[0],
        });
    }
    catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "Error creating booking",
            error: error.message,
        });
    }
};

const getBookings = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.getBookings();
        res.status(200).json({  
            message: "Bookings fetched successfully",
            data: result.rows,
        });
    }
    catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching bookings",
            error: error.message,
        });
    }   
};
const updateBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.updateBooking( req.params.bookingId as string, req.body);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({
            message: "Booking updated successfully",
            data: result.rows[0],
        });
    }
    catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "Error updating booking",
            error: error.message,
        });
    }
};

export const bookingController = {
    createBooking,
    getBookings,
    updateBooking
};
