import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import { ToDo } from "../../types"
import { useState } from "react"
import ListItemButton from "@mui/material/ListItemButton";
import ToDoInputItem from "./toDoInputItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";

export default function ToDoList({ toDos, setToDos }: { toDos: ToDo[], setToDos: React.Dispatch<React.SetStateAction<ToDo[]>> }) {
  const [selected, setSelected] = useState<string>('');

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    setToDos((toDos: ToDo[]): ToDo[] => toDos.map((el) =>
      el.id === e.target.value ? { ...el, completed: !el.completed } : el))
  }

  function handleDoubleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setSelected(e.currentTarget.getAttribute('data-value') ?? '')
  }

  return (
    <List>
      {toDos.map((toDo) => (
        <ListItem disablePadding key={toDo.id}>
          <ListItemButton data-value={toDo.id} onDoubleClick={handleDoubleClick}>
            <ListItemIcon>
              {selected !== toDo.id &&
                <Checkbox
                  edge="start"
                  disableRipple
                  checked={toDo.completed}
                  onChange={handleCheckboxChange}
                  value={toDo.id}
                />
              }
            </ListItemIcon>
            <ToDoInputItem setSelected={setSelected} selected={selected === toDo.id} toDo={toDo} setToDos={setToDos} />
          </ListItemButton>
        </ListItem>
      ))
      }
    </List >
  )
}