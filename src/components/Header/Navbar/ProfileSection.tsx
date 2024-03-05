import axiosClient from '@/axios/axiosClient'
import { profile } from 'console'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

interface ProfileSectionProps {
    profileData: {
        first_name: string,
        last_name: string,
        email:string
    }
}

const ProfileSection = ({profileData}:ProfileSectionProps) => {

    const handleLogOut = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className='border border-black overflow-hidden  w-[15rem] h-content absolute top-16 right-2 rounded-l-lg'>
            <div className='bg-black/90 py-3  flex flex-col justify-center items-center'>
                <div className='rounded-full bg-white p-0.5 h-10 w-10'>
                    <Image src="/logo.png" className="h-full w-full" height={300} width={300} alt="DK Academy logo" />
                </div>
                <div className='flex flex-col items-center justify-center text-white'>
                    <h3 className='text-xl font-semibold'>{`${profileData.first_name} ${profileData.last_name}`}</h3>
                    <p className='text-sm'>{profileData.email}</p>
                </div>
            </div>
            <div className='flex flex-col p-2 bg-gray-800/90'>
                <button className='text-start text-white hover:underline font-semibold'
                    onClick={handleLogOut}
                >Log Out</button>
            </div>
        </div>
    )
}

export default ProfileSection