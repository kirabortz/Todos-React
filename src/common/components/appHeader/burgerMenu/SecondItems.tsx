import React from 'react'
import { ListItem, ListItemButton, ListItemText, SxProps, Theme } from '@mui/material'
import List from '@mui/material/List'

export type SecondItemsProps = {
  itemMenuStyle: SxProps<Theme> | undefined
  logoutHandler: () => void
}

export const SecondItems = ({ itemMenuStyle, logoutHandler }: SecondItemsProps) => {
  return (
    <List>
      {['Logout'].map(text => (
        <ListItem key={text} disablePadding sx={itemMenuStyle}>
          <ListItemButton onClick={text === 'Logout' ? logoutHandler : () => {}}>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
