import axiosClient from '@/axios/axiosClient';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { type } from 'os';
import React, { useEffect, useState,ChangeEvent } from 'react'
import { toast } from 'react-toastify';


type testDetailsType = {
  _id: string;
  // title: string;
  // duration: string;
  type: string;
}
const initialTestDetails: testDetailsType = {
  _id: '',
  // title: '',
  // duration: '',
  type: '',
}

type TabListType = {
  [key: string]: string[];
}

const tabList:TabListType = {
  flt:['PHYSICS', 'PHYSICS NUMERIC','CHEMISTRY', 'CHEMISTRY NUMERIC', 'MATHEMATICS', 'MATHEMATICS NUMERIC'],
  mathematics:['MATHEMATICS', 'MATHEMATICS NUMERIC'],
  physics:['PHYSICS', 'PHYSICS NUMERIC'],
  chemistry:['CHEMISTRY', 'CHEMISTRY NUMERIC']
}

type tabQuestionLimitType = {
  [key: string]: string[];
  ['PHYSICS']: string[];
  ['PHYSICS NUMERIC']: string[];
  ['CHEMISTRY']: string[];
  ['CHEMISTRY NUMERIC']: string[];
  ['MATHEMATICS']: string[];
  ['MATHEMATICS NUMERIC']: string[];
}

const tabQuestionLimit:tabQuestionLimitType = {
  ['PHYSICS']: Array.from({length: 20}, (_, i) => String(1 + i)),
  ['PHYSICS NUMERIC']: Array.from({length: 10}, (_, i) => String(21 + i)),
  ['CHEMISTRY']: Array.from({length: 20}, (_, i) => String(31 + i)),
  ['CHEMISTRY NUMERIC']: Array.from({length: 10}, (_, i) => String(51 + i)),
  ['MATHEMATICS']: Array.from({length: 20}, (_, i) => String(61 + i)),
  ['MATHEMATICS NUMERIC']: Array.from({length: 10}, (_, i) => String(81 + i)),
}

type formType = {
  question_type: string,
  question_number: string,
  question_pattern: string,
  question_subject: string,
  question: string | File,
  options:{
    option_name: string,
    option_type: string,
    option: string | File
  }[],
  correct_option: string
}

const initialForm:formType = {
  question_type: 'text',
  question_number: '1',
  question_pattern: 'mcq',
  question_subject: '',
  question: '',
  options:[
    {
      option_name: 'A',
      option_type: 'text',
      option: ''
    },
    {
      option_name: 'B',
      option_type: 'text',
      option: ''
    },
    {
      option_name: 'C',
      option_type: 'text',
      option: ''
    },
    {
      option_name: 'D',
      option_type: 'text',
      option: ''
    }
  ],
  correct_option: "-"
} 


const CreateQuestions = () => {

  const router = useRouter();
  const testId = router.query.test_id;
  const [testDetails, setTestDetails] = useState<testDetailsType>(initialTestDetails);
  const tabs = tabList[testDetails.type] || tabList.flt;
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);
  const [form, setForm] = useState<formType>(initialForm);


  useEffect( () => {
    const fetchTestDetails = async () => {
      if(!testId) return;
      try {
        const res = await axiosClient.get(`tests/test-details/${testId}`);
        setTestDetails(res.data.data);
      } catch (error:any) {
        const errorMessage = error?.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
      }
   }

   fetchTestDetails();
  },[testId])

  const handleTabChange = (tab:string,tabIndex:number) => {
    setSelectedTab(tab);
    const questionNumber = tabQuestionLimit[tab][0];
    const questionPattern = tabIndex % 2 === 0 ? 'mcq' : 'numeric';
    setForm({...form, question_number: questionNumber, question_pattern: questionPattern });
  }

  const handleQuestionNumberChange = (qno:string) => {
    setForm({...form, question_number: qno })
  }

  const changeSelectedQuestionType = (type:string) => {
    setForm({...form, question_type: type });
  }

  const handleQuestionFileChange = (event:ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || '';
    setForm({...form, question: file});
  }
  
  const changeSelectedOptionType = (optionName:string,optionType:string) => {
    setForm({...form, options: form.options.map( option => option.option_name === optionName ? {...option, option_type: optionType} : option )});
  }
  
  const handleOptionFileChange = (optionName:string, event:ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || '';
    setForm({...form, options: form.options.map( option => option.option_name === optionName ? {...option, option: file} : option )});
  }

  const handleOptionTextAreaChnage = (event:ChangeEvent<HTMLTextAreaElement>,optionName:string)=> {
    setForm({...form, options: form.options.map( option => option.option_name === optionName ? {...option, option: event.target.value} : option )});
  }
  
  const handleCorrectOptionChange = (event:ChangeEvent<HTMLSelectElement>) => {
    setForm({...form, correct_option: event.target.value});
  }

  const handleCorrectOptionNumericRangeChange = (event:ChangeEvent<HTMLInputElement>,position:string) => {
    const currentvalue = form.correct_option;
    const start = currentvalue.split('-')[0];
    const end = currentvalue.split('-')[1];
    let newValue:string;
    if(position === 'start'){
      newValue = event.target.value + '-' + end;
    }
    else{
      newValue = start + '-' + event.target.value;
    }
    setForm({...form, correct_option: newValue});
  }
  
  console.log(form.correct_option);

  return (
    <div className='w-full p-3'>
      {/* tabs selection */}
      <div className='flex justify-between w-full p-3 bg-blue-400'>
        {
          tabs.map( (tab,tabIndex) => (
            <button key={tab} className={`cursor-pointer px-4 py-2 rounded ${selectedTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} `}
              onClick={() => handleTabChange(tab,tabIndex)}
            >
              <h1 className='font-bold'>{tab}</h1>
            </button>
          ))
        }
      </div>

      {/* Question numbers */}
      <div className='w-full mt-5'>
        <div className='flex gap-3 w-full overflow-x-auto scrollbar-horizontal pb-2'>
          {
            tabQuestionLimit[selectedTab].map( questionNumber => (
              <button key={questionNumber} className={`w-full p-3 rounded-lg text-center items-center ${questionNumber === form.question_number ? 'bg-blue-600 text-white' : 'bg-blue-300 text-blue-600'}`} 
                onClick={() => handleQuestionNumberChange(questionNumber)}
              >
                <h1 className='text-xl font-bold'>{questionNumber}</h1>
              </button>
            ))
          }
        </div>
      </div>

      {/* question change content */}
      <div className='border-2 border-blue-600 mt-5 rounded-lg p-2'>
        <h1 className='text-blue-600 text-xl font-bold '>Q {form.question_number}&#41;</h1>
        {/* question */}
        <div className='mt-3'>
          {/* upper */}
          <div className='flex gap-5 items-center'>
            <span className='text-blue-600 text-xl font-bold'>Question : </span>
            <div className='flex gap-2'>
              <button className={`px-4 py-2 rounded-lg ${form.question_type === 'text' ? 'bg-blue-600 text-white' : 'bg-blue-300 text-white'}`}
                onClick={() => changeSelectedQuestionType('text')}
              >
                Text
              </button>
              <button className={`px-4 py-2 rounded-lg ${form.question_type === 'img' ? 'bg-blue-600 text-white' : 'bg-blue-300 text-white'}`}
                onClick={() => changeSelectedQuestionType('img')}
              >
                Image
              </button>
            </div>
            <input type="file" className={`${form.question_type === 'text' ? 'hidden':''} ml-5`} accept="image/*" name="question" 
              onChange={handleQuestionFileChange}
            />
          </div>
          {/* lower question preview if img or textarea */}
          <div className='mt-3'>
            {/* for question textarea */}
            {
              form.question_type === 'text' && (
                <textarea className='w-full h-20 p-3 rounded-lg border border-blue-600 px-4 break-words text-wrap text-blue-600 text-xl' placeholder='Please write your question here ... '
                  value={typeof form.question ===  'object' ? '' : form.question as string}
                  onChange={(e) => setForm({...form, question: e.target.value})}
                />
              ) 
            }
            {/* for question image */}
            {
              form.question_type === 'img' && (
                <div>
                  {
                    (form.question instanceof File) ?
                    <Image height={1000} width={1000} src={URL.createObjectURL(form.question as File)} alt="question Image" className='w-[80%] h-auto ' />
                    :
                    <h1 className='text-red-600 '>No Image Selected</h1>
                  }
                </div>
                
              ) 
            }
          </div>
        </div>

        <hr className='h-1 w-full bg-red-600 my-8'/>
        
        {/* options  */}
        <div className='w-full mt-5'>
        {/* mcq options */}
        {
          form.question_pattern === 'mcq' &&(
            <div>
              {
                form.options.map( option => (
                  <div key={option.option_name} className='flex flex-col gap-3'>
                    {/* upper */}
                    <div className='flex gap-5 items-center'>
                      <h1 className='text-blue-600 text-lg font-bold'>Option - {option.option_name} : </h1>
                      <div className='flex gap-2'>
                        <button className={`px-4 py-2 rounded-lg ${option.option_type === 'text' ? 'bg-blue-600 text-white' : 'bg-blue-300 text-white'}`}
                          onClick={() => changeSelectedOptionType(option.option_name,'text')}
                        >
                          Text
                        </button>
                        <button className={`px-4 py-2 rounded-lg ${option.option_type === 'img' ? 'bg-blue-600 text-white' : 'bg-blue-300 text-white'}`}
                          onClick={() => changeSelectedOptionType(option.option_name,'img')}
                        >
                          Image
                        </button>
                      </div>

                      <input type="file" className={`${option.option_type === 'text' ? 'hidden':''} ml-5`} accept="image/*" name={'option-'+option.option_name} 
                        onChange={ event => handleOptionFileChange(option.option_name,event)}
                        />
                    </div>

                    {/* lower option preview if img or textarea */}
                      <div className='mt-3'>
                        {/* for option textarea */}
                        {
                          option.option_type === 'text' && (
                            <textarea className='w-full h-20 p-3 rounded-lg border border-blue-600 px-4 break-words text-wrap text-blue-600 text-xl' placeholder={`Please write your Option-${option.option_name} here ... `} 
                              value={typeof option.option ===  'object' ? '' : option.option as string}
                              onChange={ e => handleOptionTextAreaChnage(e,option.option_name)}
                            />
                          ) 
                        }
                        {/* for option image */}
                        {
                          option.option_type === 'img' && (
                            <div>
                              {
                                (option.option instanceof File) ?
                                <Image height={1000} width={1000} src={URL.createObjectURL(option.option as File)} alt="Option Image" className='w-auto h-auto ' />
                                :
                                <h1 className='text-red-600 '>No Image Selected</h1>
                              }
                            </div>
                            
                          ) 
                        }
                    </div>
                    <hr className='h-1 w-full bg-red-600 my-4'/>
                  </div>

                ))
              }
            </div>
          )
        }
        </div>
        
        {/* correct option */}
        <div className='flex gap-5 items-center'>
          <h1 className='text-blue-600 font-bold text-lg'>Correct {form.question_pattern === 'mcq' ? 'option' : 'Numeric Value Range'} :</h1>
          {
            form.question_pattern === 'mcq' ?
              <select className='px-4 py-2 rounded-lg border border-blue-600' name="correct_option"
                onChange={event => handleCorrectOptionChange(event)} 
                value={form.correct_option} 
              >
                <option value="-" disabled defaultValue="" >Select Option</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            :
              <div className='flex gap-4 items-center align-middle'>
                <input type="number" placeholder="Numeric Start Value" className='px-4 py-2 rounded-lg border border-blue-600' 
                  value={form.correct_option.split('-')[0]}
                  onChange={event => handleCorrectOptionNumericRangeChange(event,'start')}
                />
                <span className='text-xl font-bold'>-</span>
                <input type="number" placeholder="Numeric End Value" className='px-4 py-2 rounded-lg border border-blue-600' 
                  value={form.correct_option.split('-')[1]}
                  onChange={event => handleCorrectOptionNumericRangeChange(event,'end')}
                />
              </div>
          }

        </div>

        {/* submit button */}
        <div className=' w-full flex justify-center items-center mt-5 '>
          <button className='px-8 py-2 rounded-lg border-2 border-blue-600 text-blue-600 text-xl font-bold hover:bg-blue-600 hover:text-white'>Submit</button>

        </div>
      </div>

          

    </div>
  )
}

export default CreateQuestions