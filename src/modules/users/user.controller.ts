import { Request, Response } from "express";
import { userSerices } from "./user.service";


const getUser = async ( req:Request, res:Response ) => {
  try {
    const result = await userSerices.getUser();

    res.send({
      message: "Users fetched successfully",
      data: result.rows,
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
}

const updateUser = async (req: Request, res: Response) => {

  const {name,email}= req.body;
  try {
    const result = await userSerices.updateUser(name, email, req.params.id as string);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User UPDATE successfully",
      data: result.rows[0],
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error updating data",
      error: error.message,
    });
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userSerices.deleteUser(req.params.id as string)

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User deleted successfully",
      data: result.rows[0],
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
}

export const userController = {
  getUser,
  updateUser,
  deleteUser,
}