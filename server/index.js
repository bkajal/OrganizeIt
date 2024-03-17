const express = require("express");
const app = express();
const cors = require("cors") //Cross-Origin Resource Sharing
const pool = require("./db");
// const { spawn } = require('child_process');
// const reactApp = spawn('npm', ['start'], { stdio: 'inherit' });

//middleware
app.use(cors()); //connect 3000 with 5000
app.use(express.json());  //Parses incoming JSON data in request bodies.

//ROUTES

//CREATE a todo
app.post("/todos", async (req, res) => {
    try {
        //console.log(req.body);
        const { mission } = req.body;
        const newTask = await pool.query("INSERT INTO todo (mission) VALUES($1) RETURNING *",[mission]);

        res.json(newTask.rows[0]);
    } catch (error) {
        console.error('ADD task failed');
    }
});
//GET all todos
app.get("/todos", async (req, res) => {
    try {
        const getTasks = await pool.query("SELECT * FROM todo");
        res.json(getTasks.rows);
    } catch (error) {
        console.error('Retrieve task failed');
    }
});

//GET a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const getTask = await pool.query("SELECT * FROM todo WHERE todo_id = ($1)", [id]);

        res.json(getTask.rows[0]);
    } catch (error) {
        console.error('Retrieve task failed');
    }
});
//UPDATE a todo
app.put("/todos/:id", async(req, res) =>{
    try {
        const{id} = req.params;
        const {mission} = req.body;

        const updateTask = await pool.query("UPDATE todo SET mission = $1 WHERE todo_id = $2", [mission, id]);

        res.json("todo updated");
    } catch (error) {
        console.error('Retrieve task failed');
    }
});

//DELETE  a todo
app.delete("/todos/:id", async (req, res) => {
    const {id} = req.params;
    const deleteTask = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("Task deleted");
});

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});

