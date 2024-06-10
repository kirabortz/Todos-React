import React from "react"
import _ from "lodash"
import s from "./Pagination.module.css"
import Button from "@mui/material/Button"
import { useActions } from "common/hooks/useActions"
import { useTheme } from "@mui/material"

type Props = {
  itemsLength: number
  pageSize: number
  currentPage: number
}

export const Pagination = ({ itemsLength, pageSize, currentPage }: Props) => {
  const { updateCurrentPage } = useActions()
  const theme = useTheme()
  const pageCount = Math.ceil(itemsLength / pageSize)

  if (pageCount === 1) return null

  const changePage = (page: number) => {
    updateCurrentPage({ currentPage: page })
  }

  const pages: Array<number> = _.range(1, pageCount + 1)

  const btnStyle = {
    color: theme.palette.mode === "light" ? theme.palette.secondary.main : theme.palette.primary.main,
    backgroundColor: theme.palette.mode === "light" ? theme.palette.primary.main : theme.palette.secondary.main,
  }
  return (
    <nav>
      <ul className={s.pagination}>
        {pages.map((page) => (
          <li key={"page_" + page}>
            <Button
              style={page === currentPage ? { color: btnStyle.color, backgroundColor: btnStyle.backgroundColor } : {}}
              variant={page === currentPage ? "contained" : "outlined"}
              onClick={() => changePage(page)}
            >
              {page}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
