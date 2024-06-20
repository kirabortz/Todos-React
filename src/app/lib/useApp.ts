import { useEffect } from 'react'
import { useAppSelector } from 'app/model/Store'
import { appSelectors } from 'app/model/appSlice'
import { Theme } from '@mui/material'

type Props = {
  theme: Theme
}

export const useApp = ({ theme }: Props) => {
  useEffect(() => {
    const favicon = document.getElementById('favicon') as HTMLLinkElement
    if (favicon) {
      favicon.href = theme.palette.mode === 'dark' ? '/faviconDark.png' : '/faviconLight.png'
    }
  }, [theme.palette.mode])

  const isInitialized = useAppSelector(appSelectors.selectAppInitialized)

  return { isInitialized }
}
