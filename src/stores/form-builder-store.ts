import { FormElementInstance } from "@/features/form-builder/components/fieldComponents"
import { createStore } from "zustand/vanilla";

export type FormBuilderState = {
  elements: FormElementInstance[]
  selectedElement: FormElementInstance | null
}

export type FormBuilderActions = {
  addElement: (index: number, element: FormElementInstance) => void
  removeElement: (id: string) => void
  selectElement: (element: FormElementInstance | null) => void
  updateElement: (id: string, element: FormElementInstance) => void
  setElements: (elements: FormElementInstance[]) => void
}

export type FormBuilderStore = FormBuilderState & FormBuilderActions

export const defaultInitialState: FormBuilderState = {
  elements: [],
  selectedElement: null,
}

export const createFormBuilderStore = (initState: FormBuilderState = defaultInitialState) => {
  return createStore<FormBuilderStore>()(set => ({
    ...initState,
    addElement: (index: number, element: FormElementInstance) => {
      set(state => {
        const newElements = [...state.elements]
        newElements.splice(index, 0, element)
        return { ...state, elements: newElements }
      })
    },
    removeElement: (id: string) => {
      set(state => {
        const newElements = state.elements.filter(element => element.id !== id)
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
      set(state => {
        // const newElements = state.elements.map(e => {
        //   if (e.id === id) {
        //     return updatedElement
        //   }
        //   return e
        // })
        const newElements = state.elements
        const index = newElements.findIndex(e => e.id === id)
        newElements[index] = updatedElement
        return { ...state, elements: newElements }
      })
    },
    setElements: (elements: FormElementInstance[]) => {
      set({ elements })
    }
  }))
}
