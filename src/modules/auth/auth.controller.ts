
import { Request, Response } from "express";
import { authService } from "./auth.Service";


const createUser = async (req:Request, res:Response) => {
  try {
    const result = await authService.createUser(req.body);

    res.send({
      message: "User added successfully",
      data: result.rows,
    });


  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error adding user",
      error: error.message,
    });
  }
}


const loginUser = async (req: Request, res: Response) => {

  const {email,password} = req.body;
  try {
    const result = await authService.loginUser(email , password);

    console.log(result);

    if (result.result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User login successfully",
      data: result,
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error login user",
      error: error.message,
    });
  }
}



export const authController = {
  createUser,
  loginUser,

};