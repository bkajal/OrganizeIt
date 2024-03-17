import React, { Fragment, useState} from "react";

const InputTodo = () => {

    const [mission, setMission] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            // console.log({ mission });
            const response = await fetch(`http://localhost:5000/todos`, {
                method: "POST",
                body: JSON.stringify({ mission }),
                headers: { "Content-Type": "application/json" },
            });
            // const data = await response.json(); // wait for response
            // console.log(data);
            
            window.location = "/";
        } catch (error) {
            console.error('FORM submission error');
        }
    };

    return(
        <Fragment>
            <h1 className="text-center mt-5">To-do List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text" className="form-control text-left mr-3" value={mission} onChange={(e) => setMission(e.target.value)}/>
                <button className="btn btn-success">Add todo</button>
            </form>
        </Fragment>
    );
};

export default InputTodo;