import { TFormSettings, TFormTheme } from "@/lib/types/settings-types"
import { FormElementInstance } from "@/modules/form-builder/fieldComponentsDefinition"
import { createStore } from "zustand/vanilla"

type FormBuilderState = {
  elements: FormElementInstance[]
  selectedElement: FormElementInstance | null
  currentFormSettings: TFormSettings | undefined
  formName: string | null
}

type FormBuilderActions = {
  addElement: (index: number, element: FormElementInstance) => void
  removeElement: (id: string) => void
  selectElement: (element: FormElementInstance | null) => void
  updateElement: (id: string, element: FormElementInstance) => void
  setElements: (elements: FormElementInstance[]) => void
  setFormName: (name: string | null) => void
  clearFormSettings: () => void
  setFormSettings: (settings: TFormSettings) => void
}

export type FormBuilderStore = FormBuilderState & FormBuilderActions

const defaultInitialState: FormBuilderState = {
  elements: [],
  selectedElement: null,
  currentFormSettings: undefined,
  formName: null,
}

export const createFormBuilderStore = (
  initState: FormBuilderState = defaultInitialState
) => {
  return createStore<FormBuilderStore>()((set) => ({
    ...initState,
    addElement: (index: number, element: FormElementInstance) => {
      set((state) => {
        const newElements = [...state.elements]
        newElements.splice(index, 0, element)
        return { ...state, elements: newElements }
      })
    },
    removeElement: (id: string) => {
      set((state) => {
        const newElements = state.elements.filter(
          (element) => element.id !== id
        )
        if (state.selectedElement?.id === id) {
          return { ...state, elements: newElements, selectedElement: null }
        }
        return { ...state, elements: newElements }
      })
    },
    selectElement: (element: FormElementInstance | null) => {
      set({ selectedElement: element })
    },
    updateElement: (id: string, updatedElement: FormElementInstance) => {
      set((state) => {
        const newElements = state.elements
        const index = newElements.findIndex((e) => e.id === id)
        newElements[index] = updatedElement
        return { ...state, elements: newElements }
      })
    },
    setElements: (elements: FormElementInstance[]) => {
      set({ elements })
    },
    clearFormSettings: () => {
      set({ currentFormSettings: undefined })
    },
    setFormSettings: (settings) => {
      set({ currentFormSettings: settings })
    },
    setFormName: (name) => {
      set({ formName: name })
    },
  }))
}
