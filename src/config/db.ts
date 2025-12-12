import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS Users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone VARCHAR(15) NOT NULL,
      role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer'))
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS Vehicles (
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(100) NOT NULL,
      type VARCHAR(20) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
      registration_number VARCHAR(50) UNIQUE NOT NULL,
      daily_rent_price DECIMAL(10,2) NOT NULL CHECK (daily_rent_price > 0),
      availability_status VARCHAR(20) NOT NULL CHECK (availability_status IN ('available', 'booked')) DEFAULT 'available'
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS Bookings (
      id SERIAL PRIMARY KEY,
      customer_id INT REFERENCES Users(id) ON DELETE CASCADE,
      vehicle_id INT REFERENCES Vehicles(id) ON DELETE CASCADE,
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL,
      total_price DECIMAL(10,2) NOT NULL,
      status VARCHAR(20) CHECK (status IN ('active', 'cancelled', 'returned')) DEFAULT 'active'
    );
  `);
};

export default initDB;
