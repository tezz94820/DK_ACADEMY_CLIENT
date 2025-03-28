import Navbar from '@/components/Header/Navbar';
import Coursal from '@/components/HomePage/Coursal';
import CourseCard from '@/components/HomePage/CourseCard';
import Testimonial from '@/components/HomePage/Testimonial';
import Head from 'next/head';
import { testimonialContent } from '../../data/testimonialContent';
import Footer from '@/components/HomePage/Footer';
import { useState } from 'react';
import Modal from '@/components/HomePage/Modal';


const coursalImages = ['/homepage/coursal/1.png', '/homepage/coursal/2.png', '/homepage/coursal/3.png', '/homepage/coursal/2.png'];
const courseCardDetails = [
  {
    teacherImage: '/homepage/dksir.png',
    heading: 'PYQ Course',
    topics: ['PDF Solution', 'Video Solution', 'Chapter Wise'],
    courseLink: '/courses/pyq'
  },
  {
    teacherImage: '/homepage/dksir.png',
    heading: 'Theory Courses',
    topics: ['Lecture Video', 'Lecture Notes', 'Imp Questions', 'Short Tricks'],
    courseLink: '/courses/theory'
  },
  {
    teacherImage: '/homepage/dksir.png',
    heading: 'Test Series',
    topics: ['Test Practice', 'Test Experience'],
    courseLink: '/courses/test-series'
  }
]
export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(true); // Modal opens by default

  return (
    <div className='m-0 px-2 md:px-5'>
      <Navbar />

      {/* Modal Component */}
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} />
      )}

      {/* coursal */}
      <section className='h-[16rem] md:h-[26rem] w-full mt-20 '>
        <Coursal images={coursalImages} />
      </section>

      {/* courses section */}
      <section className='w-full my-20'>
        <h3 className='font-bold text-xl sm:text-2xl lg:text-4xl'>Explore Courses</h3>
        <div className='flex flex-col md:flex-row max-md:gap-6 md:justify-evenly  mt-10 w-full'>
          {
            courseCardDetails.map((item, index) => (
              <CourseCard key={index} details={item} />
            ))
          }
        </div>
      </section>
      {/* Testimonials section */}
      <section className='w-full my-20'>
        <h3 className=' text-center font-bold text-xl sm:text-2xl lg:text-4xl'>What some of our Students and Parents are saying</h3>
        <div className='mt-10'>
          <div className='flex flex-col max-md:gap-4 items-center md:flex-row md:justify-evenly'>
            {
              testimonialContent.map(item => (
                <Testimonial key={item.name} name={item.name} parent={item.parent} profilePhoto={item.profilePhoto} video={item.video} videoPoster={item.videoPoster} textContent={item.textContent} />
              ))
            }
          </div>
        </div>
      </section>

      {/* Footer Section section */}
      <section className='w-full mt-5'>
        <Footer />
      </section>
    </div>
  )
}
