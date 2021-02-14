import React from 'react'
import Todo from './Todo'

export default function TodoList({todos, toggleTodo}) {
    console.log(todos)
    return (
            todos.map(todo => {
                return <Todo key = {todo.id} toggleTodo={toggleTodo} todo = {todo} />;
            })
    )
}
