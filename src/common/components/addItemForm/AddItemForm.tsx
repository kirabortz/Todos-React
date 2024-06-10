import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import s from "./AddItemForm.module.css"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"

import Send from "@mui/icons-material/Send"
import { Box } from "@mui/material"
import { useAddItemFormStyles } from "common/components/addItemForm/lib/useAddItemFormStyles"

type Props = {
  entityStatus?: boolean
  addItem: (title: string) => Promise<any>
  placeholder?: string
  width?: string
}

export const AddItemForm = memo(({ entityStatus, addItem, placeholder, width }: Props) => {
  const { boxStyle, textFieldStyle, iconButtonStyle } = useAddItemFormStyles({ width })
  let [title, setTitle] = useState<string>("")
  let [error, setError] = useState<string | null>(null)

  const addTaskHandler = async () => {
    title.trim()

    try {
    await  addItem(title.trim()).then(() => {
        setTitle("")
      })
    } catch (e: any) {
      console.log(e)
      // setError(e.messages[0])
    }
  }
  const onKeyUpAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && title.length >= 1 ? addTaskHandler() : title.length < 1 && setError("Title not be empty")
  }

  const changeItemValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error !== null && setError(null)
    e.currentTarget.value === " " ? setTitle("") : setTitle(e.currentTarget.value)
  }

  const clearErrorHandler = () => setError(null)

  return (
    <Box sx={boxStyle}>
      <TextField
        sx={textFieldStyle}
        variant="outlined"
        label={placeholder}
        helperText={error}
        error={!!error}
        value={title}
        multiline
        onChange={changeItemValueHandler}
        onKeyUp={onKeyUpAddTaskHandler}
        onBlur={clearErrorHandler}
      />
      <IconButton
        onClick={addTaskHandler}
        sx={iconButtonStyle}
        className={s.addItemBtn}
        disabled={title.length < 1 || entityStatus}
      >
        <Send />
      </IconButton>
    </Box>
  )
})
