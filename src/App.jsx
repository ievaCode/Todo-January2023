import './App.scss';

import { useState, useEffect } from 'react';

import Welcome from './components/welcome/Welcome';
import Login from './components/login_form/Login';
import Form from './components/task_form/Form';
import Card from './components/card/Card';
import EditTaskForm from './components/editTask_form/EditTask';
// import Signup from './components/signup_form/Signup';


const App = () => {
  
  const [users, setUsers] = useState(null);
  const [logedinUserId, setLogedinUserId] = useState(null);
  // const [newUserId, setNewUserId] = useState(null);
  const [tasks, setTasks] = useState(null);  
  const [editedTask, setEditedTask] = useState('');  

  const fetchUsers = async () => {
    const users = await fetch('http://localhost:5000/users')
      .then(res => res.json());
    setUsers(users);
  }

  const fetchTasks = async () => {
    const allTasks = await fetch('http://localhost:5000/tasks')
      .then(res => res.json());
    setTasks(allTasks);
  }

  useEffect(()=>{
    fetchUsers();
    fetchTasks();
  }, []);

// CRUD methods

  let post = (data) => {
    fetch('http://localhost:5000/tasks', {
      method: "POST",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(data)
    })
  }

  let remove = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    })
  }

  let updateWithPUT = (id, newDataObject) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newDataObject)
    })
  }

  let updateWithPATCH = (id, newData) => { 
    console.log(`http://localhost:5000/tasks/${id}`);
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PATCH",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newData)
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }
  
  // onchange functions

  const addNewTaskCard = (newTask) => {
    setTasks([newTask, ...tasks]);
    post(newTask);
  }

  const deleteTask = (id) => {
    remove(id);
    setTasks(tasks.filter(task => task.id !== id));
  }

  const changeDone = (id) => {
    // setTasks(tasks.map(task => 
    //   task.id.toString() === id.toString() ? {...task, done: !task.done} : task
    // ));
    const oposite = !(tasks.find(task => task.id.toString() === id.toString()).done);
    setTasks(tasks.map(task => 
      task.id.toString() === id.toString() ? {...task, done: oposite} : task
    )); 
    updateWithPATCH(id, {done: oposite});

  }

  //parenka, kuris taskas bus editinamas
  const selectTask = (id) => {
    setEditedTask(tasks.find(task => task.id.toString() === id));
  }

  const editTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? {...task, ...updatedTask} : task));
    updateWithPATCH(id, updatedTask);
  }


  return (
    <>
      <header>
        <h1 className = "appName"> to do or not to do</h1>             
          {logedinUserId ?           
            <Welcome 
              username = {users.find(user => user.id === logedinUserId).username}
              tasksLeft = {tasks.filter(task => task.userId === logedinUserId).length}
            />
            : 
            <div>
              <Login 
                setLogedinUserId = {setLogedinUserId}
                users = {users} 
              />
              {/* <p>First time here?</p> */}
              {/* <Signup
                setNewUserId = {setNewUserId}
                users = {users} 
                /> */}
            </div>            
          }      
      </header>
      <main>
        {editedTask && 
          <EditTaskForm
            editedTask = {editedTask}
            setEditedTask = {setEditedTask}
            editTask = {editTask}
            setTasks = {setTasks}
            updateWithPATCH = {updateWithPATCH}
          />}
        {logedinUserId && 
              <>            
                <Form 
                  addNewTaskCard = {addNewTaskCard}
                  logedinUserId = {logedinUserId}
                />          
                <div className="taskCardsWrap">
                  {tasks.filter(task => task.userId === logedinUserId).map((task, index) => (
                      <Card 
                          key = {task.id}
                          task = {task}
                          logedinUserId = {logedinUserId}
                          deleteTask = {deleteTask}
                          changeDone = {changeDone}
                          selectTask = {selectTask}                          
                      />
                  ))} 
                </div>
              </>
        }        
      </main>      
    </>
  );
}

export default App;

