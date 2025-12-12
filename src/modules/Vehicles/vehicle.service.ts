import { pool } from "../../config/db";

const createVehicle = async (payload: {
  vehicle_name: string;
  type: "car" | "bike" | "van" | "SUV";
  registration_number: string;
  daily_rent_price: number;
  availability_status?: "available" | "booked";
}) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status = "available",
  } = payload;
  const result = await pool.query(
    `INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

const getVehicles = async () => {
  const result = await pool.query("SELECT * FROM Vehicles");
  return result;
};

const getSingleVehicle = async (id: string) => {
  const result = await pool.query(`SELECT * FROM Vehicles WHERE id = $1`, [id]);
  return result;
};

interface UpdateVehicleInput {
  id: string;
  vehicle_name: string;
  type: string;
  registration_number: string;
  daily_rent_price: number;
  availability_status: string;
}

const updateVehicle = async (input: UpdateVehicleInput) => {
  const {
    id,
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = input;

  const result = await pool.query(
    `UPDATE Vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );

  return result;
};

const deleteVehicle = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM Vehicles WHERE id=$1 RETURNING *`,
    [id]
  );
  return result;
};

export const vehiclesService = {
  createVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
