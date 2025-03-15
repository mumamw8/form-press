import { TFormTheme } from "@/lib/types/settings-types"
import styled from "styled-components"

export const DEFAULT_FORM_BG = "#ffffff"
export const DEFAULT_FORM_TEXT = "#000000"
export const DEFAULT_FORM_PLACEHOLDER = "#a1a1a1"

export const StyledFormContainerBase = styled.div<{ formTheme?: TFormTheme }>`
  background-color: ${(props) =>
    props.formTheme ? props.formTheme.background : DEFAULT_FORM_BG};
  color: ${(props) =>
    props.formTheme ? props.formTheme.text : DEFAULT_FORM_TEXT};

  input::placeholder {
    color: ${(props) =>
      props.formTheme ? props.formTheme.placeholder : DEFAULT_FORM_PLACEHOLDER};
  }
`
