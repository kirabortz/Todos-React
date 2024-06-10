import React from "react"
import { ListItem, ListItemButton, ListItemText, SxProps, Theme } from "@mui/material"
import { DarkMode, LightMode } from "@mui/icons-material"
import List from "@mui/material/List"

export type FirstItemsProps = {
  changeTheme: () => void
  theme: Theme
  themeModeBtnStyle: SxProps<Theme> | undefined
}

export const FirstItems = ({ changeTheme, theme, themeModeBtnStyle }: FirstItemsProps) => {
  return (
    <List>
      {["Theme"].map((text) => (
        <ListItem key={text} disablePadding>
          {text === "Theme" ? (
            <ListItemButton onClick={changeTheme}>
              {text === "Theme" && theme.palette.mode === "dark" ? (
                <DarkMode sx={themeModeBtnStyle} />
              ) : (
                <LightMode sx={themeModeBtnStyle} />
              )}
            </ListItemButton>
          ) : (
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          )}
        </ListItem>
      ))}
    </List>
  )
}
