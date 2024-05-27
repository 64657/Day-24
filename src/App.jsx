// // import { useState } from 'react'
// import './App.css'
// import Mutation from './Mutation';  
// import Todo from "./components/Todo";
// import Form from "./components/Form";
// import FilterButton from "./components/FilterButton";


// function App(props) {
 
//   console.log(props)
//   const taskList = props.tasks?.map((task) => (
//     <Todo
//       id={task.id}
//       name={task.name}
//       completed={task.completed}
//       key={task.id}
//     />
//   ));
  
  


//   return (
//     <>
//   <Mutation/>
//   <ul
//   role="list"
//   className="todo-list stack-large stack-exception"
//   aria-labelledby="list-heading">
//   {/* <Todo name="Eat" id="todo-0" completed/>
//   <Todo name="Sleep" id="todo-1" />
//   <Todo name="Repeat" id="todo-2" /> */}
//   {taskList}
// </ul>

//   </>
//   )
// }

// export default App


import { useState } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";


const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);


function App(props) {
  
  const [tasks, setTasks] = useState(props.tasks);

  const [filter, setFilter] = useState("All");

  // const taskList = props.tasks?.map((task) => (
    // function toggleTaskCompleted(id) {
    //   console.log(tasks[0]);
    // }
    function toggleTaskCompleted(id) {
      const updatedTasks = tasks.map((task) => {
        // if this task has the same ID as the edited task
        if (id === task.id) {
          // use object spread to make a new object
          // whose `completed` prop has been inverted
          return { ...task, completed: !task.completed };
        }
        return task;
      
      });
      setTasks(updatedTasks);
      console.log(tasks);
    }


  function addTask(name) {
    // const newTask = {id:"id", name, completed:false};
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    console.log("newTask")
    setTasks([...tasks, newTask])
    // alert(name);
  }

  function deleteTask(id) {
    // console.log(id);
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // Copy the task and update its name
        return { ...task, name: newName };
      }
      // Return the original task if it's not the edited task
      return task;
    });
    setTasks(editedTaskList);
  }
  

  // const taskList = tasks?.map((task) => (

  //   <Todo
  //     id={task.id}
  //     name={task.name}
  //     completed={task.completed}
  //     key={task.id}
  //     toggleTaskCompleted={toggleTaskCompleted}
  //     deleteTask={deleteTask}
  //     editTask={editTask}
  //   />
  // ));
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));



  // const filterList = FILTER_NAMES.map((name) => (
  //   <FilterButton key={name} name={name} />
  // ));
//   const filterList = FILTER_NAMES.map((name) => (
//   <FilterButton key={name} name={name} />
// ));

const filterList = FILTER_NAMES.map((name) => (
  <FilterButton
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
  />
));

  



  
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  // const headingText = `${taskList.length} tasks remaining`;
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {/* <FilterButton />
        <FilterButton />
        <FilterButton /> */}
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
