import React from 'react'
import  { contentList } from '../../../../data/contentList'
import Image from 'next/image'

function Content() {

  const redirectWatsapp = (title,courseLink) => {
    const message = `Hey there! I just discovered an amazing educational video course on www.dkacademy.com . It's title is ${title}. I've been finding it super insightful, and I thought you might be interested too! Check it out here: ${courseLink} #LearningTogether`
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-3'>
        {
            contentList.map( (item) => (
                <div key={item.id} className='border-gray-200 border-2 rounded shadow-lg shadow-indigo-500/50 p-2'>
                    <div className='flex h-12 w-full pt-1'>
                      <h3 className='font-medium text-sm w-3/4'>{item.title}</h3>
                      <p className='bg-yellow-300 w-8 text-center h-5 rounded-md p-0.5 text-xs ml-4 '>New</p>
                      <Image src='/watsapp.svg' height={10} width={10} alt="watsapp logo" 
                        className='h-4 w-4 ml-2 mt-0.5 cursor-pointer animate-pulse active:animate-ping' 
                        onClick={() => redirectWatsapp(item.title,item.courseLink)}
                      />
                    </div>
                    <Image src={item.thumbnail} height={300} width={300} alt="thumbnail" 
                      className='rounded-lg'
                    />
                    
                    <p>{item.class}</p>
                    <hr className='border border-purple-700'/>
                    <div>
                      <p>{item.price}</p>
                      <p>{item.old_price}</p>
                      <p> Discount of {item.discount}% applied </p>
                    </div>

                </div>
            )) 
        }
    </div>
  )
}

export default Content