import React, { useState } from 'react';
import './TaskElement.css';
export default function TaskElement({
  id,
  isCompleted,
  deleteTask,
  changeCompleteness,
  changeTask,
  title,
}) {
  const [inputCondition, setInputCondition] = useState(true);
  const [newValue, setNewValue] = useState(title);

  const submitHandler = (event) => {
    if (event.type === 'blur' || event.key === 'Enter') {
      changeTask(newValue, id);
      setInputCondition(true);
    }
  };

  return (
    <>
      <li className='taskElement'>
        {inputCondition ? (
          <>
            <input
              type='checkbox'
              className='checkbox'
              onChange={() => changeCompleteness(id, !isCompleted)}
              checked={isCompleted}
            />
            <div id='inputArea' onDoubleClick={() => setInputCondition(false)}>
              <p
                className={
                  isCompleted ? 'completed taskvalue' : 'uncompleted taskvalue'
                }
              >
                {title}
              </p>
              <button className={'delete'} onClick={() => deleteTask(id)}>
                ×
              </button>
            </div>
          </>
        ) : (
          <>
            <input
              className='valueChanger'
              value={newValue}
              onChange={(e) => setNewValue(e.currentTarget.value)}
              onKeyDown={(e) => submitHandler(e)}
              onBlur={(e) => submitHandler(e)}
              type='text'
            />
          </>
        )}
      </li>
    </>
  );
}
