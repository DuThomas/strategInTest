import NavBar from './NavBar'

export default function Layout({ children }) {
  return (
    <div className=''>
      <NavBar/>
      <main className=''>{children}</main>
    </div>
  )
}