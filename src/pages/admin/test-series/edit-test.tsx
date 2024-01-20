import axiosClient from '@/axios/axiosClient';
import { useRouter } from 'next/router';
import React, { useState, FormEvent, ChangeEvent } from 'react'
import { toast } from 'react-toastify';


interface formType {
    [key:string]:string|null|File;
    title:string;
    type:string;
    start_date:string;
    end_date:string;
    start_time:string;
    end_time:string;
    duration:string;
    total_marks:string;
    thumbnail:File | null;
  }
  
  const initailForm:formType = {
    title: "",
    type: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    duration: "",
    total_marks: "",
    thumbnail: null,
  }

  type Payload = {
    title: string;
    type: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    duration: string;
    total_marks: string;
    thumbnail: string;
    free: string;
    [key: string]: string; 
};



  function convertTo12HourFormat(timeString:string) {
    const [hours, minutes] = timeString.split(':');
    let formattedTime = '';
  
    if (Number(hours) >= 12) {
      formattedTime = (Number(hours) % 12 || 12) + ':' + minutes + ' PM';
    } else {
      formattedTime = hours + ':' + minutes + ' AM';
    }
  
    return formattedTime;
  }


  

const EditTest = () => {

    const [tabSelected, setTabSelected] = useState<string>("");
    const [form, setForm] = useState<formType>(initailForm);
    const router = useRouter();
    const testId = router.query.test_id;

    const handleTabSelection = (newTab:string) => {
        if(newTab === tabSelected){
            setTabSelected("");
        }else{
            setTabSelected(newTab);
        }
    }

    const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          const selectedThumbnail = e.target.files[0];
          setForm({ ...form, thumbnail: selectedThumbnail });
        }
      };

    const handleContentSubmit = async (event:FormEvent<HTMLFormElement>,fieldToChange: string) => {
        event.preventDefault();

        const payload:Payload = {title:'',type:'',start_date:'',end_date:'',start_time:'',end_time:'',duration:'',total_marks:'',thumbnail:'',free:''};
        if(form[fieldToChange] !== null){
            if(fieldToChange === "start_time" || fieldToChange === "end_time"){
                payload[fieldToChange] = convertTo12HourFormat(form[fieldToChange]) as string ;
            }
            else if(fieldToChange === "thumbnail"){
                payload[fieldToChange] = "true" ;
            }
            else{
                payload[fieldToChange] = form[fieldToChange] as string; 
            }
        }
        
        try {
            const response = await axiosClient.post(`admin/edit-test/${testId}`, payload, {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            const presignedUrl = response.data.data.presignedUrl;
            console.log(presignedUrl)
            if(presignedUrl.thumbnail){
                await axiosClient.put(presignedUrl.thumbnail, form.thumbnail, {
                    headers: {
                        'Content-Type': 'image/png'
                    }
                })
            }
            toast.success(`${fieldToChange} changed successfully`);
        } catch (error:any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);    
        }
        
    }


    const handleDeleteTest = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //check if user has typed delete in the input box
        if(event.currentTarget.deleteTest.value !== 'delete'){
            toast.error(`Please enter "delete" to delete the Test`);
            return;
        }
        try {
            await axiosClient.delete(`admin/delete-test/${testId}`,{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success('Test deleted successfully');
            router.back();
        } catch (error:any) {
            const errorMessage = error.response.data.message || "An error occurred";
            toast.error(errorMessage);
        }
    }


  return (
    <div className='p-5 flex flex-col gap-5'>

        {/* title  */}
        <div className=' bg-gray-300 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-black'
                onClick={() => handleTabSelection('title')}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Change Title</h3>
                <span className=' text-3xl font-bold'>{tabSelected === 'title' ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${tabSelected != 'title' && 'hidden'  } w-auto`}>
                <form onSubmit={(event) => handleContentSubmit(event,'title')} className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <p className='text-blue-600 text-lg cursor-pointer w-1/6 px-2 font-semibold'>New Title</p>
                        <input type="text" className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 ' name='title' required 
                            value={form.title}
                            onChange={(e) => setForm({...form, title: e.target.value})} 
                        />
                    </label>
                    <input type='submit' value={"Submit"} className='w-1/4 h-10 border-2 border-blue-500 text-blue-500 rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>

        {/* type  */}
        <div className=' bg-gray-300 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-black'
                onClick={() => handleTabSelection('type')}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Change Subject</h3>
                <span className=' text-3xl font-bold'>{tabSelected === 'type' ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${tabSelected != 'type' && 'hidden'  } w-auto`}>
                <form onSubmit={ event => handleContentSubmit(event,'type')} className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <p className='text-blue-600 text-lg cursor-pointer w-1/6 px-2 font-semibold'>New Subject</p>
                        <select className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 ' name='type' required 
                            value={form.type}
                            onChange={(e) => setForm({...form, type: e.target.value})}
                        >
                            <option value="" disabled defaultValue="">Select Subject</option>
                            <option value="mathematics">Mathematics</option>
                            <option value={"physics"}>Physics</option>
                            <option value={"chemistry"}>Chemistry</option>
                            <option value="flt">Full Length Test</option>
                        </select>
                    </label>
                    <input type='submit' value={"Submit"} className='w-1/4 h-10 border-2 border-blue-500 text-blue-500 rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>


        {/* Start Date  */}
        <div className=' bg-gray-300 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-black'
                onClick={() => handleTabSelection('start_date')}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Change Start Date</h3>
                <span className=' text-3xl font-bold'>{tabSelected === 'start_date' ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${tabSelected != 'start_date' && 'hidden'  } w-auto`}>
                <form onSubmit={(event) => handleContentSubmit(event,'start_date')} className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <p className='text-blue-600 text-lg cursor-pointer w-1/6 px-2 font-semibold'>New Title</p>
                        <input type="date" className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 ' name='end_date' required 
                            value={form.start_date}
                            onChange={(e) => setForm({...form, start_date: e.target.value})}
                        />
                    </label>
                    <input type='submit' value={"Submit"} className='w-1/4 h-10 border-2 border-blue-500 text-blue-500 rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>


        {/* End Date  */}
        <div className=' bg-gray-300 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-black'
                onClick={() => handleTabSelection('end_date')}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Change End Date</h3>
                <span className=' text-3xl font-bold'>{tabSelected === 'end_date' ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${tabSelected != 'end_date' && 'hidden'  } w-auto`}>
                <form onSubmit={(event) => handleContentSubmit(event,'end_date')} className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <p className='text-blue-600 text-lg cursor-pointer w-1/6 px-2 font-semibold'>New End Date</p>
                        <input type="date" className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 ' name='end_date' required 
                            value={form.end_date}
                            onChange={(e) => setForm({...form, end_date: e.target.value})}
                        />
                    </label>
                    <input type='submit' value={"Submit"} className='w-1/4 h-10 border-2 border-blue-500 text-blue-500 rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>


        {/* Start Time  */}
        <div className=' bg-gray-300 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-black'
                onClick={() => handleTabSelection('start_time')}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Change Start Time</h3>
                <span className=' text-3xl font-bold'>{tabSelected === 'start_time' ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${tabSelected != 'start_time' && 'hidden'  } w-auto`}>
                <form onSubmit={(event) => handleContentSubmit(event,'start_time')} className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <p className='text-blue-600 text-lg cursor-pointer w-1/6 px-2 font-semibold text-center'>New Start time</p>
                        <input type="time" className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 ' name='start_time' required 
                            value={form.start_time}
                            onChange={(e) => setForm({...form, start_time: e.target.value})}
                        />
                    </label>
                    <input type='submit' value={"Submit"} className='w-1/4 h-10 border-2 border-blue-500 text-blue-500 rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>


        {/* End Time  */}
        <div className=' bg-gray-300 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-black'
                onClick={() => handleTabSelection('end_time')}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Change End Time</h3>
                <span className=' text-3xl font-bold'>{tabSelected === 'end_time' ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${tabSelected != 'end_time' && 'hidden'  } w-auto`}>
                <form onSubmit={(event) => handleContentSubmit(event,'end_time')} className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <p className='text-blue-600 text-lg cursor-pointer w-1/6 px-2 font-semibold text-center'>New End Time</p>
                        <input type="time" className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 ' name='end_time' required 
                            value={form.end_time}
                            onChange={(e) => setForm({...form, end_time: e.target.value})}
                        />
                    </label>
                    <input type='submit' value={"Submit"} className='w-1/4 h-10 border-2 border-blue-500 text-blue-500 rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>

        {/* Duration Time  */}
        <div className=' bg-gray-300 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-black'
                onClick={() => handleTabSelection('duration')}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Change Duration</h3>
                <span className=' text-3xl font-bold'>{tabSelected === 'duration' ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${tabSelected != 'duration' && 'hidden'  } w-auto`}>
                <form onSubmit={(event) => handleContentSubmit(event,'duration')} className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <p className='text-blue-600 text-lg cursor-pointer w-1/6 px-2 font-semibold text-center'>New Duration</p>
                        <input type="number" className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 ' name='duration' required placeholder="180 minutes"
                            value={form.duration}
                            onChange={(e) => setForm({...form, duration: e.target.value})}
                        />
                    </label>
                    <input type='submit' value={"Submit"} className='w-1/4 h-10 border-2 border-blue-500 text-blue-500 rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>


        {/* Marks  */}
        <div className=' bg-gray-300 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-black'
                onClick={() => handleTabSelection('total_marks')}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Change Total marks</h3>
                <span className=' text-3xl font-bold'>{tabSelected === 'total_marks' ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${tabSelected != 'total_marks' && 'hidden'  } w-auto`}>
                <form onSubmit={(event) => handleContentSubmit(event,'total_marks')} className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <p className='text-blue-600 text-lg cursor-pointer w-1/6 px-2 font-semibold text-center'>New Total marks</p>
                        <input type="number" className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 ' name='total_marks' required placeholder="360 marks"
                            value={form.total_marks}
                            onChange={(e) => setForm({...form, total_marks: e.target.value})}
                        />
                    </label>
                    <input type='submit' value={"Submit"} className='w-1/4 h-10 border-2 border-blue-500 text-blue-500 rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>



        {/* thumbnail  */}
        <div className=' bg-gray-300 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-black'
                onClick={() => handleTabSelection('thumbnail')}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Change Thumbnail</h3>
                <span className=' text-3xl font-bold'>{tabSelected === 'thumbnail' ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${tabSelected != 'thumbnail' && 'hidden'  } w-auto`}>
                <form onSubmit={(event) => handleContentSubmit(event,'thumbnail')} className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <p className='text-blue-600 text-lg cursor-pointer w-1/6 px-2 font-semibold text-center'>New Thumbnail</p>
                        <input type="file" className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 ' name='thumbnail' required accept="image/png"
                            onChange={(e) => handleThumbnailChange(e)}
                        />
                    </label>
                    <input type='submit' value={"Submit"} className='w-1/4 h-10 border-2 border-blue-500 text-blue-500 rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>




        {/* delete Test  */}
        <div className=' bg-red-600 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-white'
                onClick={() => handleTabSelection('deleteTest')}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Delete Test</h3>
                <span className=' text-3xl font-bold'>{tabSelected === 'deleteTest' ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${tabSelected != 'deleteTest' && 'hidden'  } w-auto`}>
                <form onSubmit={handleDeleteTest} className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <input type="text" className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 ' name='deleteTest' required
                            placeholder={`Type "delete" to delete the test`}
                        />
                    </label>
                    <input type='submit' value={"Delete Test"} className='w-1/4 h-10 border-2 border-white text-white rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>
        

    </div>
  )
}

export default EditTest