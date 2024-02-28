import Navbar from '@/components/Header/Navbar';
import Coursal from '@/components/HomePage/Coursal';
import CourseCard from '@/components/HomePage/CourseCard';

const coursalImages = ['/homepage/coursal/1.png','/homepage/coursal/1.png','/homepage/coursal/1.png','/homepage/coursal/1.png']
const courseCardDetails = [
  {
    teacherImage: '/homepage/DKSIR.png',
    heading: 'PYQ Course',
    topics: ['PDF Solution','Video Solution','Chapter Wise'],
    courseLink: '/courses/pyq'
  },
  {
    teacherImage: '/homepage/DKSIR.png',
    heading: 'Theory Courses',
    topics: ['Imp Questions','Short Tricks'],
    courseLink: '/courses/theory'
  },
  {
    teacherImage: '/homepage/DKSIR.png',
    heading: 'Test Series',
    topics: ['Test Practice','Test Experience'],
    courseLink: '/courses/test-series'
  }
]
export default function Home() {
  return (
    <div className='m-0 px-2 md:px-5'>

      <Navbar />

      {/* coursal */}
      <section className='h-[16rem] md:h-[26rem] w-full mt-20 '>
        <Coursal images={coursalImages}/>
      </section>

      {/* courses section */}
      <section className='w-full my-10'>
        <h3 className='font-bold text-xl sm:text-2xl lg:text-4xl'>Explore Courses</h3>
        <div className='flex flex-col md:flex-row max-md:gap-6 md:justify-evenly  mt-5 w-full'>
          {
            courseCardDetails.map((item, index) => (
             <CourseCard key={index} details={item} />
            ))
          }
        </div>
      </section>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
      </div>
  )
}
