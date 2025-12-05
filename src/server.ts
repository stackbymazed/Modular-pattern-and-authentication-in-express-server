import express, { Request, Response } from 'express'
import { Pool } from "pg"
import config from './config'
import { initDB, pool } from './config/db'
import { userRoutes } from './modules/user/user.routes'

const app = express()
const port = config.Port

//middleware for the body data parse
app.use(express.json())

//table data er jonno
app.use(express.urlencoded())

//initialize database
initDB()

app.get('/', (req: Request, res: Response) => {
    res.send('server is Running port 3000')
})

//users CRUD
app.use("/users",userRoutes.router)


app.get("/users/:id", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [req.params.id])
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
})

app.put("/users/:id", async (req: Request, res: Response) => {
    const { name, email } = req.body;
    console.log(name, email);
    console.log(req.params.id);
    try {
        const result = await pool.query(`UPDATE users SET name=$1, email = $2 WHERE id = $3 RETURNING *`, [name, email, req.params.id])
        console.log(result);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: true,
                message: "No data pound there.....!"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Data updated successfully .....!",
                data: result.rows
            })
        }
    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: "content not pound"
        })
    }
})

app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`DELETE FROM users WHERE id = $1`, [req.params.id])
        res.status(200).json({
            success: true,
            message: "Data delete successfully........!",
            data: result.rowCount
        })
        console.log(result);
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Data Not pound"
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
