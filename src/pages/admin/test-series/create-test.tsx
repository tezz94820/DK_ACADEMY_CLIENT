import axiosClient from '@/axios/axiosClient';
import React, { useState,FormEvent ,ChangeEvent} from 'react'
import { toast } from 'react-toastify';

interface formType {
  title:string;
  type:string;
  start_date:string;
  end_date:string;
  start_time:string;
  end_time:string;
  duration:string;
  total_marks:string;
  thumbnail:File | null;
  free:boolean;
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
  free: true
}

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


const CreateTest = () => {

  const [form,setForm] = useState<formType>(initailForm); 

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      title:form.title,
      type:form.type,
      start_date:form.start_date,
      end_date:form.end_date,
      start_time:convertTo12HourFormat(form.start_time),
      end_time:convertTo12HourFormat(form.end_time),
      duration:form.duration,
      total_marks:form.total_marks,
      free:form.free ? 'true' : 'false',
      thumbnail:form.thumbnail === null ? 'false' : 'true'
    }

    try {
      const response = await axiosClient.post('admin/create-test',payload,{
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      const presignedurl = response.data.data.presignedUrl;
      await axiosClient.put(presignedurl.thumbnail, form.thumbnail,{
        headers:{ ' Content-Type': 'image/png' }
      });
      toast.success("Test created Successfully");
    } catch (error:any) {
      const errorMessage = error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  }



  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedThumbnail = e.target.files[0];
      setForm({ ...form, thumbnail: selectedThumbnail });
    }
  };



  return (
    <div className='p-5'>
      
      {/* heading */}
      <h1 className='text-xl font-bold text-center text-blue-600'>Create New Test</h1>
      
      {/* form */}
      <form className='w-1/2 border-2 border-blue-600 flex flex-col gap-4 p-3 mx-auto mt-4' onSubmit={ event => handleFormSubmit(event)}>
        {/* title */}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'>Title</p>
          <input type="text" className='border border-blue-600 w-4/6 h-10 rounded px-4' name='title' required 
            value={form.title}
            onChange={(e) => setForm({...form, title: e.target.value})} 
          />
        </label>
        {/* type of test */}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'>Subject</p>
          <select className='border border-blue-600 rounded p-2 w-4/6' name="type" required
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
        {/* start date */}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'>Start Date</p>
          <input type="date" className='border border-blue-600 w-4/6 h-10 rounded px-4' name='start_date' required
            value={form.start_date}
            onChange={(e) => setForm({...form, start_date: e.target.value})}
          />
        </label>
        {/* End date */}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'>End Date</p>
          <input type="date" className='border border-blue-600 w-4/6 h-10 rounded px-4' name='end_date' required
            value={form.end_date}
            onChange={(e) => setForm({...form, end_date: e.target.value})}
          />
        </label>
        {/* Start time*/}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'>Start Time</p>
          <input type="time" className='border border-blue-600 w-4/6 h-10 rounded px-4' name='start_time' required
            value={form.start_time}
            onChange={(e) => setForm({...form, start_time: e.target.value})}
          />
        </label>
        {/* End time*/}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'>End Time</p>
          <input type="time" className='border border-blue-600 w-4/6 h-10 rounded px-4' name='end_time' required 
            value={form.end_time}
            onChange={(e) => setForm({...form, end_time: e.target.value})}
          />
        </label>
        {/* Test Duration*/}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'>Test Duration<br/><span className='text-red-600'>&#40;in minutes&#41;</span></p>
          <input type="number" className='border border-blue-600 w-4/6 h-10 rounded px-4' name='duration' required placeholder="180 minutes"
            value={form.duration}
            onChange={(e) => setForm({...form, duration: e.target.value})}
          />
        </label>
        {/* Total Marks*/}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'>Total Marks</p>
          <input type="number" className='border border-blue-600 w-4/6 h-10 rounded px-4' name='total_marks' required placeholder="360 marks"
            value={form.total_marks}
            onChange={(e) => setForm({...form, total_marks: e.target.value})}
          />
        </label>
        {/* Thumbnail*/}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'>Thumbnail Image</p>
          <input type="file" className='border border-blue-600 w-4/6  h-10 rounded px-4 text-center align-middle' name='thumbnail' accept=".png" required 
            onChange={(e) => handleThumbnailChange(e)}
          />
        </label>
        {/* Free*/}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'>Free</p>
          <input type="checkbox" className='border border-blue-600 w-4/6  h-10 rounded px-4' name='free'
            checked={form.free}
            onChange={(e) => setForm({...form, free: e.target.checked})}
          />
        </label>



        {/* submit button */}
        <input type="submit" value="Create Test" className='px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white shadow shadow-blue-600 w-1/2 mx-auto text-center align-middle text-xl font-bold cursor-pointer'/>
      </form>
    </div>
  )
}

export default CreateTest





