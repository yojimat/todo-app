import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Input from "@mui/material/Input";
import { useState } from "react";
import { ToDo } from "../../types";
import { IconButton } from "@mui/material";

export default function ToDoHeader({ setToDos }: { setToDos: React.Dispatch<React.SetStateAction<ToDo[]>> }) {
  const [newToDo, setNewToDo] = useState<string>('')

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setToDos((toDos: ToDo[]): ToDo[] => [...toDos, { id: crypto.randomUUID(), text: newToDo, completed: false }])
      setNewToDo('')
    }
  }

  function handleClick() {
    setToDos((toDos: ToDo[]): ToDo[] => {
      if (toDos.every(el => el.completed)) return toDos.map(el => ({ ...el, completed: false }))
      return toDos.map(el => ({ ...el, completed: true }))
    })
  }

  return (
    <Box component='header' sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <IconButton onClick={handleClick} size="small" sx={{ mr: 1 }}>
        <Icon fontSize="small">expand_more</Icon>
      </IconButton>
      <Input onKeyDown={handleEnter} id="newToDoInput" value={newToDo} placeholder="What needs to be done?" onChange={e => setNewToDo(e.target.value)} />
    </Box >
  )
}