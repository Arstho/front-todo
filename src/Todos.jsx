import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos, addTodo } from './features/todoSlice';
import Todo from './Todo';

const Todos = () => {
  const todos = useSelector(state => state.todosReduser.todos);
  const loading = useSelector(state => state.todosReduser.loading)
  const error = useSelector(state => state.todosReduser.error)
  const dispatch = useDispatch()
  const [text, setText] = React.useState('')

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const addTask = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(addTodo(text));
      setText('')
    }
  }

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return error;
  }

  return (
    <>
      <form >
        <input className='inputField' placeholder='Введите текст ...' type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button className='add' onClick={addTask}> Добавить</button>
      </form>
      <ul className='list' >
        {todos.map(todo => {
          return <Todo text={todo.text} completed={todo.completed} id={todo._id} key={todo._id} />
        })}
      </ul>
    </>
  )
}

export default Todos
