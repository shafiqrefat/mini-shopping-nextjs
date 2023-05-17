import { Inter } from 'next/font/google'
import Layout from '@/components/layouts/layout'
import Products from './products'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ children }) {
  return (
    <Layout>
      <main>
        <Products />
      </main>
    </Layout>
  )
}
