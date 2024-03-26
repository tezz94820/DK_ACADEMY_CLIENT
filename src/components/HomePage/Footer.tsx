import Image from 'next/image'
import React from 'react'

const socialMediaImages = [
    { url: '/homepage/social_media/facebook.png', link: 'https://www.facebook.com/dkacademyiit' },
    { url: '/homepage/social_media/instagram.png', link: 'https://www.instagram.com/dkacademy_official/' },
    { url: '/homepage/social_media/youtube.png', link: 'https://www.youtube.com/channel/UCD9JTkcYU8C0oVe6xhjmvJA' },
    { url: '/homepage/social_media/x.png', link: 'https://twitter.com/dharmendrabe?s=20&t=3cd5dTwoexIkUZvHJTNS1A' },
    { url: '/homepage/social_media/whatsapp.png', link: 'https://wa.me/+919325987875?text=Hello%20DK%20Academy%20,%20I%20want%20to%20join%20the%20Academy.' }
];

const Footer = () => {
    return (
        <div className='bg-blue-800/90 rounded-lg text-white px-1'>

            <section className='flex flex-col gap-4 sm:flex-row justify-evenly p-2 '>
                <div className='flex flex-col items-center p-2'>
                    <h3 className='text-2xl font-semibold'>Address Info</h3>
                    <hr className='h-0.5 w-3/4 my-2 bg-white' />
                    <p className='text-center'>Genius Associates Rd, Masoodpur, Sector B, <br /> Vasant Kunj, New Delhi, Delhi 110070</p>
                    <Image src='/homepage/social_media/maps.png' onClick={() => window.open('https://maps.app.goo.gl/tMcP6JbZduaMwe6DA', '_blank')} className="h-10 w-10 md:h-12 md:w-12 mr-3 rounded-lg shadow-sm shadow-white p-1 cursor-pointer hover:border mt-2" alt="Social Media" width={75} height={100} />
                </div>
                <div className='flex flex-col items-center p-2'>
                    <h3 className='text-2xl font-semibold'>Social Media</h3>
                    <hr className='h-0.5 w-3/4 my-2 bg-white' />
                    <ul className='flex flex-row justify-center gap-2 mt-2 flex-wrap'>
                        {
                            socialMediaImages.map((image, index) => <Image key={index} src={image.url} onClick={() => window.open(image.link, '_blank')} className="h-10 w-10 md:h-12 md:w-12 mr-3 rounded-lg shadow-sm shadow-white p-1 cursor-pointer hover:border" alt="Social Media" width={75} height={100} />)
                        }
                    </ul>
                </div>
                <div className='flex flex-col items-center p-2'>
                    <h3 className='text-2xl font-semibold'>Contact Info</h3>
                    <hr className='h-0.5 w-3/4 my-2 bg-white' />
                    <p className='text-center'>+91-9325987875</p>
                    <p className='text-center'>+91-9717159062</p>
                    <p className='text-center mt-0.5'>k.dharmendrabe@gmail.com</p>
                    <ul className='flex flex-row gap-2 mt-2'>
                        <Image src='/homepage/social_media/call.png' onClick={() => window.open(`tel:+919325987875`)} className="h-10 w-10 md:h-12 md:w-12 mr-3 rounded-lg shadow-sm shadow-white p-1 cursor-pointer hover:border" alt="Social Media" width={75} height={100} />
                        <Image src='/homepage/social_media/gmail.png' onClick={() => window.open(`mailto:k.dharmendrabe@gmail.com`)} className="h-10 w-10 md:h-12 md:w-12 mr-3 rounded-lg shadow-sm shadow-white p-1 cursor-pointer hover:border" alt="Social Media" width={75} height={100} />
                    </ul>
                </div>
            </section>

            <section className='flex flex-col justify-center items-center max-sm:mt-5'>
                <Image src="/logo.png" className="h-10 w-16 md:h-14 " alt="DK Academy Logo" width={75} height={100} />
                <p className='mt-2 text-center'>Copyright © D.K Academy 2024</p>
                <p className='mb-2 text-center'>Privacy Policy | Payments Terms | Refund & Cancellation</p>
            </section>

        </div>
    )
}

export default Footer