import React from 'react'
import Image from 'next/image';
import styles from '../../courseStyles.module.css';

export type TeachersType = {
    name: string;
    image: string;
    experience: string;
    subject: string;
}

type TeachersProps = {
    teachers: TeachersType[];
}
function Teachers({ teachers }: TeachersProps) {
    return (
        <div className='h-max shadow-lg shadow-blue-800/50 p-1 md:p-5 rounded-3xl mt-5 flex flex-col border-gray-200 border-2'>
            <div>
                <h2 className='text-lg font-bold'>Know Your Teachers</h2>
            </div>
            <div className={`overflow-x-scroll rounded-sm p-1 mt-4 ${styles.hide_scrollbar} `}>
                {
                    teachers.map((item) => (
                        <div key={item.name} className='w-36 border p-1 flex flex-col shadow-md shadow-black/50'>
                            <div className='relative h-40 w-32 bg-gray-100 mx-auto'>
                                <Image src={item.image || '/teacher-profile.svg'} alt="teacher" height={300} width={300} className='h-full w-full' />
                                <div className='absolute bottom-2 w-full shadow-md shadow-black'>
                                    <p className='text-xs text-center align-middle bg-white font-semibold w-full mx-auto rounded-lg p-0.5'>{item.name}</p>
                                </div>
                            </div>
                            <div className='flex flex-col h-12 bg-gray-100 mx-1 p-1'>
                                <p className='text-sm font-semibold'>{item.subject}</p>
                                <p className='text-xs'>Exp:&nbsp;{item.experience}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Teachers