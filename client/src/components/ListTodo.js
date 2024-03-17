import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {

    const [todos, setTodos] = useState([]);

    //delete todo function
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: 'DELETE'
            });
            console.log(deleteTodo);

            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (error) {
            console.error('Cannot Delete')
        }
    }

    //Display to-dos
    const getTodos = async () => {
        try {
           const response = await fetch("http://localhost:5000/todos");
           const jsonData = await response.json();
            // console.log(jsonData);
           setTodos(jsonData);
        } catch (error) {
            console.error('Cannot Fetch Data');
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    // console.log(todos);
    return (
        <Fragment>
            {""}
            <table className="table table table-hover mt-5 text-center ">
                <thead>
                    <tr>
                        <th>Mission</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>               
                    {todos.length > 0 && todos.map(todo => (
                            <tr key={todo.todo_id}>
                                {/* {Object.values(todo).map((mission) =>(
                                    ))} */}
                                <td>{todo.mission}</td>
                                <td><EditTodo todo={todo}/></td>
                                <td><button className = "btn btn-danger" onClick = {() => deleteTodo(todo.todo_id)}>Delete</button>
                                </td>
                            </tr>
                    ))}
                    {todos.length===0 && (
                      <tr>
                        <td colSpan="3">No Mission Relax!!</td>
                      </tr>
                    )}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodo;