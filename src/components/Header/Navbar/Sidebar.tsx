import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image'; 
import { mobileNavLinks } from '../../../../data/mobileNavLinks';
import { useRouter } from 'next/router';


interface SidebarProps {
    toggleHandler : () => void
}
function Sidebar({toggleHandler} : SidebarProps) {

  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect( () => {
    if(!localStorage.getItem('token')){
      setIsAuthenticated(false);
    }
  },[])

  return (
    <motion.div
      className='h-screen w-screen absolute top-0 right-0'
      initial={{ x: 300 }} 
      animate={{x:0}} 
      transition={{ ease: "easeInOut", duration: 0.1 }}
    >
      {/* left to sidebar like modal */}
      <div onClick={toggleHandler} className='w-screen h-full absolute top-0 right-60' />
      
      {/* mainSidebar */}
      <div className='w-80 h-full bg-white absolute top-0 right-0 flex flex-col justify-between rounded-l-lg border-2 border-blue-800 '>
        <div className='h-[7.5%] flex gap-1 border-b-2 border-gray-200 px-4 py-3.5 ' onClick={() => router.push("/")}>
          <Image src="/logo.png" className="h-10 w-16 md:h-14 mr-3" alt="DK Academy Logo" width={75} height={100} />
          <span className="self-center text-1xl text-blue-800 font-semibold whitespace-nowrap relative right-3" >DK Academy</span>
        </div>
        <ul className={`${isAuthenticated? 'h-[88.5%] gap-5' : 'h-[83.5%] gap-3 pt-3'} flex flex-col font-medium  px-2 bg-blue-600`}>
          {mobileNavLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={toggleHandler} className={`w-full p-4 m-1 border border-white text-white bg-blue-800  hover:bg-blue-600 rounded-lg hover:text-sky-500 flex flex-row gap-3 ${router.pathname === link.href ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : ''}`}>
              <Image src={link.icon} className="h-6 w-6" alt={link.name} width={75} height={100} />
              <span>{link.name}</span>
            </Link>
          ))}
        </ul>
        {
          !isAuthenticated &&
            <div className='h-[9%] flex flex-row justify-evenly p-4 border-t-2 border-white '>
                <Link href="/auth/login" className='px-4 py-2 bg-blue-800 rounded-lg text-white text-semibold text-2xl hover:bg-blue-600'>Login</Link>
                <Link href="/auth/register" className='px-4 py-2 bg-blue-800 rounded-lg text-white text-semibold text-2xl hover:bg-blue-600'>Register</Link>
            </div>
        }
      </div>

      

    </motion.div>
  );
}

export default Sidebar;
