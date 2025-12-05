import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await userService.CreateUserService(name, email);
        console.log(result.rows[0]);
        res.status(200).json({
            success: true,
            message: "Data inserted successfully.....!"
        })

    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

const AllUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.AllUserService();
        res.status(200).json({
            success: true,
            message: "Data is having successfully......!",
            data: result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const GetSingleUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getSingleUser(req.params.id as string);
        res.status(200).json({
            success: true,
            message: "Data having successfully.....!",
            data: result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


export const userController = {
    createUser,
    AllUser,
    GetSingleUser,
};