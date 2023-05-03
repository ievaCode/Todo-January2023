import './card.scss'

import Button from '../button/Button';

const Card = ({task, deleteTask, changeDone, selectTask}) => { 

const importanceName = task.importance.split(" ").join("");

let timeLeft = (task.deadline + 86400000) - Date.now();
let timeLeftText;
let daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
let hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
if (timeLeft > 86400000) {
  if (daysLeft > 1) {
    timeLeftText = `${daysLeft} days left`;
  } else {
    timeLeftText = `${daysLeft} day left`;
  }
} else {
  if (hoursLeft > 1) {
    timeLeftText = `${hoursLeft} hours left`;
  } else {
    timeLeftText = `${hoursLeft} hour left`;
  }
}

    return(
      <article className="taskCard">
        <div className={`importance ${importanceName}`}>
          <p>{task.importance}</p>
        </div>
        <div className = "mainWrap">
          <div className={`strikeOut${task.done.toString()}`}></div>
          <div className = "leftWrap">
            <Button
              classname2 = {`doneButton`}  
              text = "done"
              id = {task.id}
              action = {changeDone}
            />
            <div className="task">
              <p className = "taskText">{task.task}</p>
            </div>
          </div>
         <div className = "rightWrap">
          <div className="daysLeft">
            <p className = {`daysLeftText ${importanceName}`}>{timeLeftText}</p>
          </div>
          <Button
            classname2 = "editButton"
            text = "edit"
            action = {selectTask}
            id = {task.id}
          />
          <Button
            classname2 = "deleteButton"
            text = "delete"
            action = {deleteTask}            
            id = {task.id}
          />
         </div>
       </div>
      </article>
    )    
}

export default Card

// {`mainWrap done${task.done.toString()}`}


