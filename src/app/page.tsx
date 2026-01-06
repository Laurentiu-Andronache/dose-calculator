import { Calculator } from '@/components/Calculator'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <Calculator />
        </div>
      </main>

      <Footer />
    </div>
  )
}
