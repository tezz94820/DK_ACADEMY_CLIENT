"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '../../../../data/navLinks';
import Sidebar from './Sidebar';

function Navbar() {

  const [toggle, setToggle] = useState(false);
  const toggleHandler = () => {
    setToggle(!toggle);
  }

  return (
    <>
      <nav className="bg-white fixed h-auto w-full z-20 top-0 left-0 border-b border-gray-200 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3 pr-1 md:p-4">
         
          {/* left */}
          <Link href="/" className="flex items-center">
              <Image src="/logo.png" className="h-10 w-16 md:h-14 mr-3" alt="Flowbite Logo" width={75} height={100} />
              <span className="self-center text-1xl md:text-2xl font-semibold whitespace-nowrap" >DK Academy</span>
          </Link>

          {/* mid */}
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
              {
                navLinks.map( link => (
                  <Link key={link.name} href={link.href} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 " aria-current="page">{link.name}</Link> 
                ))
              }
            </ul>
          </div>

          {/* right */}
          <div className="flex justify-center md:order-2 gap-1 md:gap-4 ">
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Login</button>
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center hidden md:block">Register</button>
              <button onClick={toggleHandler} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 outline-none ring-2 ring-gray-200 z-10" aria-controls="navbar-sticky" aria-expanded="false">
                { toggle ? 
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  :
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                }
              </button>
          </div>
        </div>
        {/* sidebar */}
        {
          toggle && <Sidebar toggleHandler={toggleHandler}/>
        }

      </nav>
    </>
  )
}

export default Navbar