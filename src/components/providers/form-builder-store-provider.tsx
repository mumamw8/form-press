"use client"

import {
  FormBuilderStore,
  createFormBuilderStore,
} from "@/stores/form-builder-store"
import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"

export type FormBuilderStoreApi = ReturnType<typeof createFormBuilderStore>

export const FormBuilderStoreContext = createContext<
  FormBuilderStoreApi | undefined
>(undefined)

export interface FormBuilderStoreProviderProps {
  children: ReactNode
}

export const FormBuilderStoreProvider = ({
  children,
}: FormBuilderStoreProviderProps) => {
  const storeRef = useRef<FormBuilderStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createFormBuilderStore()
  }

  return (
    <FormBuilderStoreContext.Provider value={storeRef.current}>
      {children}
    </FormBuilderStoreContext.Provider>
  )
}

export const useFormBuilderStore = <T,>(
  selector: (store: FormBuilderStore) => T
): T => {
  const formBuilderStoreContext = useContext(FormBuilderStoreContext)

  if (!formBuilderStoreContext) {
    throw new Error(
      `useFormBuilderStore must be used within BuilderStoreProvider`
    )
  }

  return useStore(formBuilderStoreContext, selector)
}
