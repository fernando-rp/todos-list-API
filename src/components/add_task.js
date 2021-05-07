import React, { useState } from 'react';

function AddTask() {

    const [task, SetTask] = useState([])
        
    function addtarea(e) {
        
        if (e.key === "Enter" && e.target.value !== "") {     
         let nt=[...task];
         let ne=[e.target.value]
         SetTask(nt.concat(ne));
         e.target.value="";

        }  
    }

    function deleteTask(e){
        
        e.target.parentNode.parentNode.remove();
    }

    return (
                <>
                    <div className="row ">
                        <div className="col-6 d-flex flex-column mx-auto mt-2">
                            <input className="col-12 p-2" placeholder="add task" onKeyUp={addtarea} />
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-6 mx-auto mt-2" id="taskcontainer">
                            <ul className="list-group">
                            {!!task &&
                                task.map((elem,index)=>{
                                    return( <div className="row" key={index}>
                                                <div className="col-11" >{elem}</div>  
                                                <div className="col-1"><span className=" far fa-trash-alt" onClick={deleteTask}></span></div>
                                            </div>
                                    )
                                })
                            }
                            </ul>
                        </div>
                    </div>
                </>
            );
}

 export default AddTask;