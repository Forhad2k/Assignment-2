import { Request, Response } from "express";
import { vehiclesService } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.createVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error adding vehicle",
      error: error.message,
    });
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getVehicles();

    res.send({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

const getSingleVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getSingleVehicle(
      req.params.vehicleId as string
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching data",
      error: error.message,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;
  const { vehicleId } = req.params;
  console.log("Updating vehicle with ID:", vehicleId);

  try {
    const result = await vehiclesService.updateVehicle({
      id: vehicleId as string,
      vehicle_name,
      type,
      registration_number: registration_number,
      daily_rent_price,
      availability_status,
    });

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Vehicle not found" });

    res.json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating vehicle", error: error.message });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.deleteVehicle(
      req.params.vehicleId as string
    );
    console.log("Deleting vehicle with ID:", req.params.vehicleId);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "vehicle not found" });
    }

    res.json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting vehicle",
      error: error.message,
    });
  }
};

export const vehicleController = {
  createVehicle,
  getVehicles,
  getSingleVehicles,
  updateVehicle,
  deleteVehicle,
};
