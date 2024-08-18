import { styled } from '@mui/material'
import React from 'react'

const StyledButton = styled('div')`
  background-color: #c0c0c0;
  border: 3px solid #fff;
  border-right-color: #808080;
  border-bottom-color: #808080;
  border-left-color: #fff;
  border-top-color: #fff;
  color: black;
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: dunggeunmo-bold;
  &:active {
    border-right-color: #fff;
    border-bottom-color: #fff;
    border-left-color: #808080;
    border-top-color: #808080;
  }
  max-width: 100px;
  gap: 5px;
  max-height: 30px;
`

type Props = {
  children: React.ReactNode
  textLeftIcon: React.ReactNode
  onClick: () => void
}

export default function WindowButton({ children, textLeftIcon, onClick }: Props) {
  return (
    <StyledButton onClick={onClick}>
      {textLeftIcon}
      {children}
    </StyledButton>
  )
}
