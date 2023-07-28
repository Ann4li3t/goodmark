import Head from "next/head"
import Header from "./header"
import Footer from "./footer"

export default function Layout({children, title = '', description = ''}) {
  return (
    <main className="wrapper">
      <Head>
          <title>{`Goodmark - ${title}`}</title>
          <meta name="description" content="{description}" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Header />
      {children}      
    </main>
  )
}
