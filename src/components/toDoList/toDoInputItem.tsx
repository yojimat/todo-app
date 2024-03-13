import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Input from "@mui/material/Input";
import Icon from "@mui/material/Icon"
import { ToDo } from "../../types";
import { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";

type ToDoInputItemProps = {
  selected: boolean,
  toDo: ToDo,
  setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>,
  setSelected: React.Dispatch<React.SetStateAction<string>>
}

export default function toDoInputItem({ setSelected, selected, toDo, setToDos }: ToDoInputItemProps) {
  const [text, setText] = useState(toDo.text);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setToDos((toDos: ToDo[]): ToDo[] => toDos.map((el) =>
        el.id === toDo.id ? { ...el, text } : el))
      setSelected('')
    }

    if (e.key === 'Escape') setSelected('');
  }

  function handleClick() {
    setToDos((toDos: ToDo[]): ToDo[] => toDos.filter((el) => el.id !== toDo.id))
    setSelected('')
  }

  function handleClickOutside(e: MouseEvent) {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setSelected('')
    }
  };

  useEffect(() => {
    setText(toDo.text)
    if (selected) {
      document.addEventListener('click', handleClickOutside, true)
      document.getElementById("inputToDo")?.focus()
    } else
      document.removeEventListener('click', handleClickOutside, true);
  }, [selected])

  useEffect(() => {
    document.getElementById("deleteContainer")?.parentElement?.addEventListener('mouseenter', () => setIsHovered(true))

    document.getElementById("deleteContainer")
      ?.parentElement?.addEventListener('mouseleave', () => setIsHovered(false));

    return () => {
      document.getElementById("deleteContainer")
        ?.parentElement?.removeEventListener('mouseleave', () => setIsHovered(false));

      document.getElementById("deleteContainer")?.parentElement?.removeEventListener('mouseenter', () => setIsHovered(true))
    }
  }, [])

  return (
    <>
      {selected ?
        <ListItemText ref={ref}>
          <Input id="inputToDo" fullWidth value={text} onChange={e => setText(e.target.value)} onKeyDown={handleKeyDown} />
        </ListItemText>
        :
        <ListItemText sx={{ textDecoration: toDo.completed ? 'line-through' : 'none' }}
          primaryTypographyProps={{
            color: toDo.completed ? 'text.secondary' : 'text.primary'
          }}
          primary={toDo.text} />
      }
      <ListItemIcon id="deleteContainer">
        {isHovered && !selected &&
          <IconButton onClick={handleClick} size="small">
            <Icon>delete</Icon>
          </IconButton>
        }
      </ListItemIcon>
    </>
  )
}
