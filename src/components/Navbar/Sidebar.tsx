import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { navLinks } from '../../../data/navLinks';


interface SidebarProps {
    toggleHandler : () => void
}
function Sidebar({toggleHandler} : SidebarProps) {

  return (
    <motion.div
      className='h-screen w-60 absolute top-0 right-0 bg-sky-500'
      initial={{ x: 300 }} // Initial position (off-screen)
      animate={{x:0}} // Animation controls
    >
      <ul className="flex flex-col p-4 mt-4 font-medium ">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} onClick={toggleHandler}>
            <div className="w-full py-2 pl-3 pr-4 text-white rounded hover:bg-orange-400  hover:text-sky-500 flex flex-row gap-3">
              <div className='h-6 w-6' dangerouslySetInnerHTML={{ __html: link.icon }} />
              {link.name}
            </div>
          </Link>
        ))}
      </ul>
    </motion.div>
  );
}

export default Sidebar;
