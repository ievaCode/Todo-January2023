import './form.scss';
import { nanoid } from 'nanoid';
import { useState } from "react";

const Form = (props) => {  

  const [enteredTask, setEnteredTask] = useState({
    task: '',
    deadline: '',
    importance: ''
  });

  const handleInputChange = (e) => {
    e.target.name === "deadline" ? 
    setEnteredTask(prev => ({...prev, deadline: e.target.valueAsNumber})) :
    setEnteredTask(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  const submitHandler = (e) => {
    console.log(enteredTask);
    e.preventDefault();    
    const newTask = {
      task: enteredTask.task,
      deadline: enteredTask.deadline,
      importance: enteredTask.importance,
      id: nanoid(),
      done: false, 
      userId: props.logedinUserId
    }
    console.log(newTask);
    props.addNewTaskCard(newTask);   
    setEnteredTask({
      task: '',
      deadline: '',
      importance: ''
    });
    console.log(enteredTask)
  }

  const getCurrentDate = () => {
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`
  }

  return (
    <>
      <form className = "addNewTaskForm" onSubmit={submitHandler}>
        <textarea
          name="task"
          value={enteredTask.task}
          onChange={handleInputChange}
          placeholder="my new to do:"
          required
        />
        <label>
          Deadline
          <input
            type="date"
            name="deadline"
            value={enteredTask.date}
            onChange={handleInputChange}
            min = {getCurrentDate()}
            required
          />
        </label>
        <label>
          Importance
          <select 
            name="importance"
            value={enteredTask.importance}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled></option>
            <option value="super important">super important</option>
            <option value="important">important</option>
            <option value="needs to be done">needs to be done</option>
            <option value="could wait">could wait</option>
          </select>
        </label>
        <input type="submit" value="Add task" />
      </form>
    </>
  );
}
 
export default Form;