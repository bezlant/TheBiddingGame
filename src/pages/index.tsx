import * as React from 'react'

import App from '@/components/App'
import Layout from '@/components/layout/Layout'
import Seo from '@/components/Seo'

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='templateTitle' description='description' />
      <App />
    </Layout>
  )
}
