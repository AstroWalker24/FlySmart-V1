import React from 'react'
//importing the logo from the images folder 
import logo from './images/airplane.png'
import Example  from './Dropdown'


export default function Navbar() {
  return (
    <nav className='bg-gray-900 shadow shadow-gray-300 w-100 px-8 md:px-auto'>
        <div className='md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap'>

          {/* Logo */}
          <div className="text-indigo-500 md:order-1">
              <img className='logo' src={logo} alt='flight-logo'width={40} height={40} ></img>
            </div>

          <div className='text-red-100 order-3 w-full md:w-auto md:order-2'>
            <ul className='flex font-semibold justify-between'>
              <li className='md:px-4 md:py-2 hover:text-red-500'><a href='#'>Dashboard</a></li>
              <li className='md:px-4 md:py-2 hover:text-red-500'><a href='#'>Coupons</a></li>
              <li className='md:px-4 md:py-2 hover:text-red-500'><a href='#'>About</a></li>
             
            </ul>
          </div>

          <div className='order-2 md:order-3'>
         
            <Example/>
          </div>
        </div>
    </nav>
  )
}
