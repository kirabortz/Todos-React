import React, { memo, useState } from "react"
import Button from "@mui/material/Button"
import { DarkMode, LightMode, Menu } from "@mui/icons-material"
import { ListItem, ListItemButton, useTheme } from "@mui/material"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box/Box"
import { useActions } from "common/hooks/useActions"
import { useAppSelector } from "app/model/Store"
import { authSelectors } from "features/auth/model/authSlice"
import { FirstItems } from "common/components/appHeader/burgerMenu/FirstItems"
import { SecondItems } from "common/components/appHeader/burgerMenu/SecondItems"
import { useBurgerMenuStyles } from "common/components/appHeader/lib/useBurgerMenuStyles"

export type BurgerMenuProps = {
  changeTheme: () => void
}

export const BurgerMenu = memo(({ changeTheme }: BurgerMenuProps) => {
  const [isShowMenu, setIsShowMenu] = useState(false)
  const { logout } = useActions()
  const theme = useTheme()
  const { boxStyle, menuIconStyle, themeModeBtnStyle, menuItemsStyle, itemMenuStyle } = useBurgerMenuStyles()
  const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)

  const LogoutHandler = () => {
    logout()
  }

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return
    }
    setIsShowMenu(open)
  }

  return (
    <Box sx={boxStyle}>
      {isLoggedIn ? (
        <Button onClick={toggleDrawer(true)}>
          <Menu sx={menuIconStyle} />
        </Button>
      ) : (
        <ListItem disablePadding>
          <ListItemButton onClick={changeTheme}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={themeModeBtnStyle} />
            ) : (
              <LightMode style={themeModeBtnStyle} />
            )}
          </ListItemButton>
        </ListItem>
      )}

      <SwipeableDrawer anchor={"top"} open={isShowMenu} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} sx={menuItemsStyle}>
          <FirstItems changeTheme={changeTheme} theme={theme} themeModeBtnStyle={themeModeBtnStyle} />

          <Divider style={{ width: "100%" }} />

          <SecondItems itemMenuStyle={itemMenuStyle} logoutHandler={LogoutHandler} />
        </Box>
      </SwipeableDrawer>
    </Box>
  )
})
