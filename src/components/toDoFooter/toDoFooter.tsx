import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Filter, ToDo } from "../../types";
import { Filters } from "../../App";
import { useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

type ToDoFooterProps = {
  setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>,
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
  toDoAmount: number
}

export default function ToDoFooter({ setToDos, setFilter, toDoAmount }: ToDoFooterProps) {
  const [buttonSelected, setButtonSelected] = useState<string>('left')

  function selectFilter(selectedFilter: Filter) {
    setFilter(() => selectedFilter)
  }

  function handleAlignment(e: React.MouseEvent<HTMLElement>, button: string,) {
    setButtonSelected(button);
  };

  function handleClearCompleted() {
    setToDos((prev) => prev.filter(Filters.Active))
  }

  return (
    <Box component='footer' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      <span>{toDoAmount} item{toDoAmount > 1 ? "s" : ""} left</span>

      <ToggleButtonGroup
        value={buttonSelected}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton onClick={() => selectFilter(Filters.All)} value="left">All</ToggleButton>
        <ToggleButton onClick={() => selectFilter(Filters.Active)} value="center">Active</ToggleButton>
        <ToggleButton onClick={() => selectFilter(Filters.Completed)} value="right">Completed </ToggleButton>
      </ToggleButtonGroup>

      <Button onClick={handleClearCompleted} variant="text">Clear completed</Button>
    </Box >
  )
}