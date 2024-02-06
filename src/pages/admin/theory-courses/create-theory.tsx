import axiosClient from '@/axios/axiosClient';
import React, { useState,FormEvent,ChangeEvent } from 'react';
import { toast } from 'react-toastify';

interface formType {
  title:string;
  module:string;
  subject:string;
  class_name:string;
  price:string;
  discounted_price:string;
  language:string;
  thumbnail:File | null;
}

const initailForm:formType = {
  title: "",
  module:"",
  subject: "",
  class_name:"",
  price:"",
  discounted_price:"",
  language:"",
  thumbnail: null,
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



const CreateTheory = () => {

  const [form,setForm] = useState<formType>(initailForm); 

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const payload = {
      title:form.title,
      module:form.module,
      subject:form.subject,
      class_name:form.class_name,
      old_price:form.price,
      price:form.discounted_price,
      language:form.language,
      thumbnail:form.thumbnail === null ? 'false' : 'true'
    }

    try {
      const response = await axiosClient.post('admin/create-theory',payload,{
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      const presignedurl = response.data.data.presignedUrl;
      await axiosClient.put(presignedurl.thumbnail, form.thumbnail,{
        headers:{ ' Content-Type': 'image/png' }
      });
      toast.success("Theory Course Created Successfully");
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
      <h1 className='text-xl font-bold text-center text-blue-600'>Create New Theory Course</h1>
      
      {/* form */}
      <form className='w-1/2 border-2 border-blue-600 flex flex-col gap-4 p-3 mx-auto mt-4' onSubmit={ event => handleFormSubmit(event)}>
        {/* title */}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'>Title</p>
          <input type="text" className='border border-blue-600 w-4/6 h-10 rounded px-4' name='title' required 
            value={form.title}
            onChange={(e) => setForm({...form, title: e.target.value})} 
            placeholder='Quadratic Equations'
          />
        </label>
        {/* title */}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'>Module</p>
          <input type="text" className='border border-blue-600 w-4/6 h-10 rounded px-4' name='module' required 
            value={form.module}
            onChange={(e) => setForm({...form, module: e.target.value})} 
            placeholder='Calculas'
          />
        </label>
        {/* subject */}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'>Subject</p>
          <select className='border border-blue-600 rounded p-2 w-4/6' name="subject" required
            value={form.subject}
            onChange={(e) => setForm({...form, subject: e.target.value})}
          >
            <option value="" disabled defaultValue="">Select Subject</option>
            <option value="mathematics">Mathematics</option>
            <option value={"physics"}>Physics</option>
            <option value={"chemistry"}>Chemistry</option>
          </select>
        </label>
        {/* class */}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'>Class</p>
          <input type="text" className='border border-blue-600 w-4/6 h-10 rounded px-4' name='module' required 
            value={form.class_name}
            onChange={(e) => setForm({...form, class_name: e.target.value})} 
            placeholder='11th / 12th'
          />
        </label>
        {/* Price*/}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'>Price</p>
          <input type="number" className='border border-blue-600 w-4/6 h-10 rounded px-4' name='price' required placeholder=" &#8377; 500"
            value={form.price}
            onChange={(e) => setForm({...form, price: e.target.value})}
          />
        </label>
        {/* Discounted Price*/}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'> Discounted Price</p>
          <input type="number" className='border border-blue-600 w-4/6 h-10 rounded px-4' name='discounted_price' required placeholder=" &#8377; 450"
            value={form.discounted_price}
            onChange={(e) => setForm({...form, discounted_price: e.target.value})}
          />
        </label>
        {/* Language */}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'>Language</p>
          <select className='border border-blue-600 rounded p-2 w-4/6' name="language" required
            value={form.language}
            onChange={(e) => setForm({...form, language: e.target.value})}
          >
            <option value="" disabled defaultValue="">Select Language</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="hinglish">Hinglish</option>
          </select>
        </label>
        {/* Thumbnail*/}
        <label className='flex justify-center items-center gap-3'>
          <p className='text-blue-600 text-xl cursor-pointer w-2/6'>Thumbnail Image</p>
          <input type="file" className='border border-blue-600 w-4/6  h-10 rounded px-4 text-center align-middle' name='thumbnail' accept=".png" required 
            onChange={(e) => handleThumbnailChange(e)}
          />
        </label>

        {/* submit button */}
        <input type="submit" value="Create Theory Course" className='px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white shadow shadow-blue-600 w-1/2 mx-auto text-center align-middle text-xl font-bold cursor-pointer'/>
      </form>
    </div>
  )
}

export default CreateTheory