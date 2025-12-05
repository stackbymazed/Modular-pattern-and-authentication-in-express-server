import  express, { Request, Response }  from "express"
import { pool } from "../../config/db";
import { userController } from "./user.controller";
const router = express.Router()


// ("/users") 
router.post("/",userController.createUser)

//("users")
router.get("/", userController.AllUser)

router.get("/:id",userController.GetSingleUser)




export const userRoutes = {
    router
};


