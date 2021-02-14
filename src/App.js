import TodoList from "./TodoList"
import React, {useState, useRef, useEffect} from 'react'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    
    setTodos(prevTodos => {
      return [...prevTodos, {id: name, name: name, complete: false}]
    });
    console.log(localStorage.getItem(LOCAL_STORAGE_KEY))
    todoNameRef.current.value = null
  }

  function handleClearFunction() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  return (
    <>
      <TodoList todos = {todos} toggleTodo = {toggleTodo} />
      <input ref = {todoNameRef} type="text"/>
      <button onClick = {handleAddTodo}>Add to-do</button>
      <button onClick = {handleClearFunction}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
