import { Request, Response } from "express";
import { pool } from "../../config/db";

const CreateUserService = async (name:string,email:string) => {
    const result = await pool.query(`INSERT INTO users(name,email) VALUES($1,$2) RETURNING *`, [name, email]);
    return result;
}

const AllUserService = async()=>{
   const result =  await pool.query(`SELECT * FROM users`);
   return result;
}
export const userService = {
    CreateUserService,
    AllUserService,
};