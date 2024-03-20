import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
// import Footer from "@/app/components/footer"
// import Header from "@/app/components/header"
import { WithApolloProvider } from "./providers/WithApolloProvider";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zli名鑑",
  description:
    `Zli名鑑は、Zliのメンバーを紹介するためのサイトです。Zliのメンバーの情報を知りたい方は、ぜひご覧ください。`,
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WithApolloProvider>
          <div className="flex flex-col justify-between w-full h-full min-h-screen">
            {/* <Header /> */}
            {/* <main className="flex-auto  w-full px-10 py-4 mx-auto sm:px-6 md:py-6"> */}
            <main>
              {children}
            </main>
            {/* <Footer /> */}
          </div>
        </WithApolloProvider>
      </body>
    </html>
  )
}

