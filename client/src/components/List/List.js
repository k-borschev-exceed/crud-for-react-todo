import React from 'react';
import TaskElement from '../TaskElement/TaskElement';
import './List.css';

export default function List(props) {
  const renderHandler = () => {
    let tasksTemplate = null;

    if (props.tasks.length) {
      tasksTemplate = props.tasks.map((item) => {
        if (
          props.showCondition === 'all' ||
          (props.showCondition === 'uncompleted' && !item.isCompleted) ||
          (props.showCondition === 'completed' && item.isCompleted)
        ) {
          return (
            <TaskElement
              title={item.title}
              key={item.id}
              id={item.id}
              isCompleted={item.isCompleted}
              changeCompleteness={props.changeCompleteness}
              deleteTask={props.deleteTask}
              changeTask={props.changeTask}
            />
          );
        }
        return null;
      });
    } else {
      tasksTemplate = <p>No tasks</p>;
    }
    return tasksTemplate;
  };

  return (
    <>
      <hr></hr>
      <ul>{renderHandler()}</ul>
    </>
  );
}
