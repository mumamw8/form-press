"use client"

import { PropsWithChildren } from "react"
import { FormBuilderStoreProvider } from "@/components/providers/form-builder-store-provider"
import { TRPCReactProvider } from "@/trpc/client"

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <TRPCReactProvider>
      <FormBuilderStoreProvider>{children}</FormBuilderStoreProvider>
    </TRPCReactProvider>
  )
}
