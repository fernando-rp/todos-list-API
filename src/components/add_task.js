import React, { useEffect, useState } from 'react';

const AddTask =()=> {

    const [task, SetTasks] = useState(null)

    useEffect (()=>{

        const getTask = () => {
            fetch('https://assets.breatheco.de/apis/fake/todos/user/fernandorp', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => {
                    return resp.json();
                })
                .then(data => {
                    if (data.msg){
                      createUser();
                    } else {
                        SetTasks(data);
                    }                
                })
                .catch(error => {
                    console.log(error);
                });
        }
       getTask();

    },[])

    useEffect(()=>{

        const addTask= ()=>{
            fetch('https://assets.breatheco.de/apis/fake/todos/user/fernandorp', {
                method: "PUT",
                body: JSON.stringify(task),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => {
                    console.log(resp.ok);
                    console.log(resp.status);
                    console.log(resp.text());
                    return resp.json();                    
                })
                .then(data => {
                    console.log(data) 
                })
                .catch(error => {
                    console.log(error);
                });
        }
        addTask();
        
    },[task])

    const createUser= ()=>{
        fetch('https://assets.breatheco.de/apis/fake/todos/user/fernandorp', {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                console.log(resp.ok);
                console.log(resp.status);
                console.log(resp.text());
                return resp.json();
            })
            .then(data => {
                SetTasks(data);
            })
            .catch(error => {
                console.log(error);
            });
    }
   
   
    function addtarea(e) {
        if (e.key === "Enter" && e.target.value !== "" && task!=="") {
            let nt = [...task];
            let ne = {
                label: e.target.value,
                done: false
            }
            let ntasks=nt.concat(ne);
                SetTasks(ntasks);          
                e.target.value = "";

        } 
    }
  
    function deleteTask(e) {
        let task_updated=[];
        task.map((elem,index)=>{
            if(index!==e){
                task_updated.push(elem);
            }
            return task_updated;
        })

        SetTasks(task_updated)

        //SetTasks(task.splice(e,1));
        //console.log(e);
    }

    function deleteAll(){

        const deleteAllTasks= ()=>{
                fetch('https://assets.breatheco.de/apis/fake/todos/user/fernandorp', {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(resp => {
                        console.log(resp.ok);
                        console.log(resp.status);
                        console.log(resp.text());
                        return resp.json();
                    })
                    .then(data => {
                        console.log(data)
                        //SetTasks([])
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        deleteAllTasks();
        SetTasks([])

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
                            task.map((elem, index) => {
                                return (<div className="row" id={index} key={index}>
                                    <div className="col-11" >{elem.label}</div>
                                    <div className="col-1"><span className=" far fa-trash-alt" onClick={()=> deleteTask(index)}></span></div>
                                </div>
                                )
                            })
                        }
                    </ul>
                    <button type="button" className="btn btn-warning" onClick={deleteAll}>Delete All Tasks</button>
                </div>
            </div>
        </>
    );
}

export default AddTask;