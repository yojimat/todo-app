import './App.css'
import Paper from '@mui/material/Paper';
import ToDoFooter from './components/toDoFooter/toDoFooter'
import ToDoHeader from './components/toDoHeader/toDoHeader'
import ToDoList from './components/toDoList/toDoList'
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { Filter, ToDo } from './types';

export const Filters = {
  All: (_el: ToDo) => true,
  Active: (el: ToDo) => el.completed !== true,
  Completed: (el: ToDo) => el.completed === true
}

function App() {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [selectedFilter, setFilter] = useState<Filter>(() => Filters.All);

  return (
    <>
      <CssBaseline enableColorScheme />
      <main>
        <Paper elevation={3} sx={{ padding: '1rem' }}>
          <ToDoHeader setToDos={setToDos} />
          {toDos.length > 0 && (
            <>
              <ToDoList setToDos={setToDos} toDos={toDos.filter(selectedFilter)} />
              <ToDoFooter setFilter={setFilter} toDoAmount={toDos.filter(Filters.Active).length} setToDos={setToDos} />
            </>
          )}
        </Paper>
      </main >
    </>
  )
}

export default App
