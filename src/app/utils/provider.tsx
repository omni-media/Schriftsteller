"use client";

import React from "react"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"

function Providers({ children }: React.PropsWithChildren) {
	const [client] = React.useState(new QueryClient())

	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default Providers;
