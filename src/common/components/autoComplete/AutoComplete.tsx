import React, { memo } from "react"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { useAutoComplete } from "common/components/autoComplete/lib/useAutoComplete"
import { useAutoCompleteStyles } from "common/components/autoComplete/lib/useAutoCompleteStyles"

export const AutoComplete = memo(() => {
  const { availableTodos, selectedTodos, selectTodosHandler } = useAutoComplete()
  const { textFieldStyle } = useAutoCompleteStyles()

  return (
    <Autocomplete
      multiple
      limitTags={2}
      options={availableTodos}
      getOptionLabel={(option) => option.title}
      value={selectedTodos}
      onChange={selectTodosHandler}
      renderInput={(params) => {
        return (
          <TextField
            sx={textFieldStyle.root}
            {...params}
            label="Find..."
            placeholder={availableTodos.length ? `remain: ${availableTodos.length}` : "all selected"}
          />
        )
      }}
      sx={{ width: "500px" }}
    />
  )
})
