'use client'

import {useState} from "react";

let id = 0;
const intialTaskList = [
  {id: id++, label: "Walk the dog"},
  {id: id++, label: "Water the plants"},
  {id: id++, label: "Wash the dishes"},
]

export default function Home() {
  const [todo, setTodo] = useState("");
  const [taskList, setTaskList] = useState(intialTaskList);

  return (
      <div>
        <h1>Todo List</h1>
        <div>
          <input
              type="text"
              placeholder="Add your task"
              aria-label="Add your task"
              value={todo}
              onChange={(event) => {
                setTodo(event.target.value)
              }}
          />
          <div>
            <button onClick={
              () => {
                setTaskList(taskList.concat([
                  {
                    id: id++,
                    label: todo
                  }
                ]));
                setTodo("");
              }
            }>Submit</button>
          </div>
        </div>
        <ul>
          {
            taskList.map((item) => (
                <li key={item.id}>
                  <span>{item.label}</span>
                  <button onClick = {() => {
                    setTaskList(taskList.filter((task) => task.id !== item.id))
                  }}>Delete</button>
                </li>
            ))
          }
        </ul>
      </div>
  );
}
