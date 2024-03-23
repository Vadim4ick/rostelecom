/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

const Logo = () => (
  <Link className='logo' href={'/'}>
    <img src='/img/logo.svg' className='logo__img' alt='logo' />
  </Link>
)

export { Logo }
