import * as React from 'react'

import Layout from '@/components/layout/Layout'
import Seo from '@/components/Seo'

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='templateTitle' description='description' />
      <main className='bg-primary-900'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
          {' '}
          <p className='text-white'>
            Connect to metamask or redirect to download metamask wallet
          </p>
        </div>
      </main>
    </Layout>
  )
}
