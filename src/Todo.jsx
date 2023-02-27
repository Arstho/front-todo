import React from 'react'
import { useDispatch } from 'react-redux'
import { completeTodo, deleteTodo } from './features/todoSlice'

const Todo = ({ id, text, completed }) => {
  const dispatch = useDispatch()

  const handleCompleted = () => {
    dispatch(completeTodo({ id, completed }))
  }

  const handleDelete = () => {
    dispatch(deleteTodo({ id }))
  }

  return (
    <li>
      <input type='checkbox' checked={completed} onChange={handleCompleted} />
      {text}
      <button className='del' onClick={handleDelete}>❌</button>
    </li>
  )
}

export default Todo;
