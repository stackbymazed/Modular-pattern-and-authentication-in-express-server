import  express, { Request, Response }  from "express"
import { pool } from "../../config/db";
const router = express.Router()


// ("/users") 
router.post("/", async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query(`INSERT INTO users(name,email) VALUES($1,$2) RETURNING *`, [name, email]);
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
})

//("users")
router.get("/", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM users`);
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
})


export const userRoutes = router;


