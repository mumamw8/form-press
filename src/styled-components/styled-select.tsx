import React from "react"
import styled from "styled-components"

const StyledSelectBase = styled.select`
  width: 100%;
  height: 36px;
  padding-top: 0px;
  padding-right: 10px;
  padding-left: 10px;
  font-size: 1rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 1px 0px,
    rgba(1, 5, 1, 0.16) 0px 0px 0px 1px, rgba(1, 5, 1, 0.08) 0px 2px 5px 0px;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  border-left-width: 0px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  outline-style: none;
  background-color: rgba(255, 255, 255, 0.055);
  color: rgb(0, 0, 0);
  caret-color: rgb(0, 0, 0);
`
const StyledSelect = React.forwardRef<
  HTMLSelectElement,
  React.ComponentProps<"select">
>(({ className, ...props }, ref) => {
  return <StyledSelectBase className={className} ref={ref} {...props} />
})
StyledSelect.displayName = "StyledSelect"

export { StyledSelect }
