import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { navLinks } from '../../../../data/navLinks';
import Image from 'next/image'; 


interface SidebarProps {
    toggleHandler : () => void
}
function Sidebar({toggleHandler} : SidebarProps) {

  return (
    <motion.div
      className='h-screen w-screen absolute top-0 right-0'
      initial={{ x: 300 }} 
      animate={{x:0}} 
      transition={{ ease: "easeIn", duration: 0.2 }}
    >
      {/* left to sidebar like modal */}
      <div onClick={toggleHandler} className='w-screen h-full absolute top-0 right-60 bg-gray-400 opacity-40' />
      
      {/* mainSidebar */}
      <div className='w-60 h-full bg-gradient-to-r from-sky-500 to-violet-800 absolute top-0 right-0 flex flex-col p-4 gap-2'>
        <div className='flex gap-1'>
          <Image src="/logo.png" className="h-10 w-16 md:h-14 mr-3" alt="Flowbite Logo" width={75} height={100} />
          <span className="self-center text-1xl  font-semibold whitespace-nowrap relative right-3" >DK Academy</span>
        </div>
        <ul className="flex flex-col mt-4 font-medium">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={toggleHandler}>
              <div className="w-full py-2 pl-3 pr-4 text-white rounded hover:bg-orange-400  hover:text-sky-500 flex flex-row gap-3">
                <div className='h-6 w-6' dangerouslySetInnerHTML={{ __html: link.icon }} />
                {link.name}
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default Sidebar;
