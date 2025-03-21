import { TFormTheme } from "@/lib/types/settings-types"
import styled from "styled-components"

export const DEFAULT_FORM_BG = "#ffffff"
export const DEFAULT_FORM_TEXT = "#000000"
export const DEFAULT_FORM_PLACEHOLDER = "#a1a1a1"
export const DEFAULT_FORM_ACCENT = "#C7E3FF"
export const DEFAULT_FORM_BUTTON_BG = "#2563EB"
export const DEFAULT_FORM_BUTTON_TEXT = "#FFFFFF"
export const DEFAULT_FORM_INPUT_BORDER = "#d2d2d229"
export const DEFAULT_FORM_INPUT_BG = "#ffffff0e"
export const DEFAULT_FORM_INPUT_HEIGHT = "36"

export const StyledFormContainerBase = styled.div<{ formTheme?: TFormTheme }>`
  .form-width {
    width: 720px;
  }
  background-color: ${(props) =>
    props.formTheme?.background ? props.formTheme.background : DEFAULT_FORM_BG};
  color: ${(props) =>
    props.formTheme?.text ? props.formTheme.text : DEFAULT_FORM_TEXT};

  /* input styling */
  input::placeholder {
    color: ${(props) =>
      props.formTheme?.inputPlaceholder
        ? props.formTheme.inputPlaceholder
        : DEFAULT_FORM_PLACEHOLDER};
  }
  /* input:not([disabled]):focus {
    box-shadow: ${(props) =>
    props.formTheme?.accent ? props.formTheme.accent : DEFAULT_FORM_ACCENT}
        0px 0px 0px 4px,
      rgba(1, 5, 1, 0.16) 0px 0px 0px 1px;
  } */

  .form-theme-bg {
    background-color: ${(props) =>
      props.formTheme?.background
        ? props.formTheme.background
        : DEFAULT_FORM_BG};
  }
  .form-theme-box-shadow:not([disabled]):focus {
    box-shadow: ${(props) =>
          props.formTheme?.accent
            ? props.formTheme.accent
            : DEFAULT_FORM_ACCENT}5e
        0px 0px 0px 3px,
      rgba(1, 5, 1, 0.16) 0px 0px 0px 1px;
  }
  .form-theme-placeholder {
    color: ${(props) =>
      props.formTheme?.inputPlaceholder
        ? props.formTheme.inputPlaceholder
        : DEFAULT_FORM_PLACEHOLDER};
  }
  .form-theme-select:has(option:checked:disabled) {
    color: ${(props) =>
      props.formTheme?.inputPlaceholder
        ? props.formTheme.inputPlaceholder
        : DEFAULT_FORM_PLACEHOLDER};
  }
  .form-theme-select,
  .form-theme-input,
  .form-theme-textarea {
    color: ${(props) =>
      props.formTheme?.text ? props.formTheme.text : DEFAULT_FORM_TEXT};
    caret-color: ${(props) =>
      props.formTheme?.text ? props.formTheme.text : DEFAULT_FORM_TEXT};
    border: 1px solid
      ${(props) =>
        props.formTheme?.inputBorder
          ? props.formTheme.inputBorder
          : DEFAULT_FORM_INPUT_BORDER};
  }
  .form-theme-checkbox {
    border-color: ${(props) =>
      props.formTheme?.text ? props.formTheme.text : DEFAULT_FORM_TEXT};
  }
  .form-theme-checkbox[data-state="checked"] {
    background-color: ${(props) =>
      props.formTheme?.accent ? props.formTheme.accent : DEFAULT_FORM_ACCENT};
    border-color: ${(props) =>
      props.formTheme?.accent ? props.formTheme.accent : DEFAULT_FORM_ACCENT};
    color: ${(props) =>
      props.formTheme?.background
        ? props.formTheme.background
        : DEFAULT_FORM_BG};
  }
  .form-theme-rounded {
    border-radius: ${(props) =>
      props.formTheme?.inputBorderRadius
        ? props.formTheme.inputBorderRadius
        : "5px"};
  }
  .form-theme-input-height {
    height: ${(props) =>
      props.formTheme?.inputHeight
        ? props.formTheme.inputHeight
        : DEFAULT_FORM_INPUT_HEIGHT}px;
  }
  .form-theme-input-border {
    border: 1px solid
      ${(props) =>
        props.formTheme?.inputBorder
          ? props.formTheme.inputBorder
          : DEFAULT_FORM_INPUT_BORDER};
  }
  .form-theme-input-bg {
    background-color: ${(props) =>
      props.formTheme?.inputBackground
        ? props.formTheme.inputBackground
        : DEFAULT_FORM_INPUT_BG};
  }
  .form-theme-button-bg {
    background-color: ${(props) =>
      props.formTheme?.buttonBackground
        ? props.formTheme.buttonBackground
        : DEFAULT_FORM_BUTTON_BG};
  }
  .form-theme-button-text {
    color: ${(props) =>
      props.formTheme?.buttonText
        ? props.formTheme.buttonText
        : DEFAULT_FORM_BUTTON_TEXT};
  }
`
