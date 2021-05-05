import React from 'react';
import './Footer.css';

export default function Footer({
  clearCompleted,
  showActive,
  showAll,
  showCompleted,
  tasksCounter,
  showCondition,
  logout,
}) {
  const clearCompletedF = () => clearCompleted();
  const showActiveF = () => showActive();
  const showAllF = () => showAll();
  const showCompletedF = () => showCompleted();

  return (
    <div id='footer'>
      <p className='itemsLeft'>{tasksCounter.active} items left</p>
      <ul className='menu'>
        <li
          className={`menuElement ${showCondition === 'all' ? 'active' : 'n'}`}
          onClick={showAllF}
        >
          All
        </li>
        <li
          className={`menuElement ${
            showCondition === 'uncompleted' ? 'active' : 'n'
          }`}
          onClick={showActiveF}
        >
          Active
        </li>
        <li
          className={`menuElement ${
            showCondition === 'completed' ? 'active' : 'n'
          }`}
          onClick={showCompletedF}
        >
          Completed
        </li>
      </ul>
      <button
        className={`footerBtn ${!tasksCounter ? 'hidden' : ''}`}
        onClick={clearCompletedF}
      >
        Clear completed
      </button>
    </div>
  );
}
