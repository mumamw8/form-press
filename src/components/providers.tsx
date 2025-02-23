"use client"

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { HTTPException } from "hono/http-exception"
import { PropsWithChildren, useState } from "react"
import { Provider as ChakraProvider } from "./chakra-ui/provider"
import { FormBuilderStoreProvider } from "@/components/providers/form-builder-store-provider"
import { TRPCProvider } from "@/trpc/client"

export const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            let errorMessage: string
            if (err instanceof HTTPException) {
              errorMessage = err.message
            } else if (err instanceof Error) {
              errorMessage = err.message
            } else {
              errorMessage = "An unknown error occurred."
            }
            // toast notify user, log as an example
            console.log(errorMessage)
          },
        }),
      })
  )

  return (
    <ChakraProvider forcedTheme="light">
      <TRPCProvider>
        <QueryClientProvider client={queryClient}>
          <FormBuilderStoreProvider>{children}</FormBuilderStoreProvider>
        </QueryClientProvider>
      </TRPCProvider>
    </ChakraProvider>
  )
}
