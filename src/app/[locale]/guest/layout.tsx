import Layout from '@app/[locale]/(public)/layout'

type TLayout = {
  children: React.ReactNode
  params: { locale: string }
}

export default function GuestLayout({ children, params: { locale } }: TLayout) {
  return <Layout params={{ locale }}>{children}</Layout>
}
