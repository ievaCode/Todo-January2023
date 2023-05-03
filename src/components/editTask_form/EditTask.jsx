import { useState } from "react";

import './editTask.scss'

const EditTaskForm = ({editTask, editedTask, setEditedTask, updateWithPATCH}) => {

    const [formInputs, setFormInputs] = useState({
        task: editedTask.task,
        deadline: editedTask.deadline,
        importance: editedTask.importance
    });
    
    const handleInputChange = (e) => {
        e.target.name === "deadline" ? 
        setFormInputs(prev => ({...prev, deadline: e.target.valueAsNumber})) :
        setFormInputs(prev => ({...prev, [e.target.name]: e.target.value}));
      };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(editedTask.id);
        editTask(editedTask.id, formInputs);
        // updateWithPATCH(editedTask.id, formInputs);
        setEditedTask('');
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
    <div className="modal">
      <form className = "addNewTaskForm" onSubmit={submitHandler}>
        <textarea
          name="task"
          value={formInputs.task}
          onChange={handleInputChange}
        //   onChange={(e) => setFormInputs({...formInputs, task:e.target.value})}
        />
        <label>
          Deadline
          <input
            type="date"
            name="deadline"
            value={formInputs.date}
            onChange={handleInputChange}
            min = {getCurrentDate()}
          />
        </label>
        <label>
          Importance
          <select 
            name="importance"
            value={formInputs.importance}
            onChange={handleInputChange}
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
    </div>
  );
}
 
export default EditTaskForm;