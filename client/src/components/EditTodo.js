import React,{ Fragment, useState } from "react";

const EditTodo = ({ todo }) => {

    const [mission, setMission] = useState(todo.mission);

    //Edit To-do mission ONcLICK Edit
    const updateMission = async (e) =>{
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mission })
            });
            // Update Data in Database to see on webpage load it
            window.location = "/";
        } catch (error) {
            console.error('Cannot Update')
        }
    };

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle="modal" 
            data-target={`#id${todo.todo_id}`}>
            Edit
            </button>

            {/* id = id58 */}
            <div className="modal" id={`id${todo.todo_id}`} onClick={() => setMission(todo.mission)}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Update Mission</h4>
                            <button type="button" className="close" data-dismiss="modal" 
                            onClick={() => setMission(todo.mission)}>&times;</button>
                        </div>

                        <div className="modal-body">
                            <input type="text" className="form-control" value={mission} onChange={e => setMission(e.target.value)} />
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-dismiss="modal"
                            onClick={e => updateMission(e)}>Edit</button>
                            <button type="button" className="btn btn-warning" data-dismiss="modal"
                            onClick={() => setMission(todo.mission)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditTodo;