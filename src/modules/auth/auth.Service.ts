import bcrypt from "bcryptjs";
import { pool } from "../../config/db.js";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";


 const createUser = async (payload: Record<string, unknown>) => {
     const {name, email, password, phone, role} = payload;

     console.log(payload);

      const  hashedPass = await bcrypt.hash(password as string, 10)

    const result = await pool.query(
      "INSERT INTO Users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, hashedPass, phone, role]
    );
     return result;
 }


 const loginUser = async(email : string, password : string)=>{

    const result = await pool.query(
      `SELECT * FROM Users WHERE email = $1`,
      [email]);

      const user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);
      
      if (!match) {
        throw new Error("Invalid credentials");
      }
      
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, config.jwt_secret_key as string, { expiresIn: '7d' });
      console.log(token);

      return { user, token , result};

 }

export const authService = {
    createUser,
    loginUser
  
};