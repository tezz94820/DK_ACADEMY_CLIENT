import React from 'react'
import Video from './Video'
import SolutionsCountWithColor from './SolutionsCountWithColor'
import NavigationByQuestionSection from './NavigationByQuestionSection'

type MobileToggleProps = {
    tabDetails: { [key: string]: string },
    handleTestSubmitToSummary: () => void
} 

const MobileToggle = ( {tabDetails, handleTestSubmitToSummary} : MobileToggleProps ) => {
    return (
        <div className='sm:hidden fixed top-0 right-0 bg-white z-10 my-2 py-2 border-4 border-blue-800 border-r-0 h-[calc(d100vh-1rem)] flex flex-col gap-2 justify-evenly w-[60%] transition-transform duration-500 transform translate-x-0'>
            <div className='flex flex-col items-center justify-center '>
                <div className=' flex items-center justify-center h-32 w-auto my-auto'>
                    <Video />
                </div>
                <p>Video is Monitored</p>
            </div>
            {/* question information section */}
            <div className='px-3 py-2 border-t-2 border-blue-800'>
                <SolutionsCountWithColor />
            </div>
            {/* Question buttons  */}
            <div className='h-[50%] overflow-y-scroll border-y-2 border-blue-800'>
                <NavigationByQuestionSection tabDetails={tabDetails} />
            </div>
            {/* submit test button  */}
            <div className='flex justify-center items-center'>
                <button className='border-2 border-red-500 px-5 py-1  rounded-lg h-max text-red-500 hover:bg-red-500 hover:text-white font-bold' onClick={handleTestSubmitToSummary}>Submit Test</button>
            </div>
        </div>
    )
}

export default MobileToggle