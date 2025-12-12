import express from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middleware/auth";





const router = express.Router();

router.post("/", vehicleController.createVehicle)

router.get("/", vehicleController.getVehicles)

router.get("/:vehicleId", vehicleController.getSingleVehicles)

router.put("/:vehicleId", auth(), vehicleController.updateVehicle)

router.delete("/:vehicleId", auth(), vehicleController.deleteVehicle)

export const vehicleRouter = router;