import axiosClient from '@/axios/axiosClient';
import { useRouter } from 'next/router';
import React, { useState, FormEvent, ChangeEvent } from 'react'
import { toast } from 'react-toastify';


interface formType {
    [key:string]:string|null|File;
    title:string;
    module:string;
    subject:string;
    thumbnail:File | null;
    class_name:string;
    price:string;
    old_price:string;
    language:string;
  }
  
  const initailForm:formType = {
    title:"",
    module:"",
    subject:"",
    thumbnail:null,
    class_name:"",
    price:"",
    old_price:"",
    language:"",
  }

  type Payload = {
    [key:string]:string;
    title:string;
    module:string;
    subject:string;
    thumbnail:string;
    class_name:string;
    price:string;
    old_price:string;
    language:string;
};


const EditTheory = () => {

    const [tabSelected, setTabSelected] = useState<string>("");
    const [form, setForm] = useState<formType>(initailForm);
    const router = useRouter();
    const courseId = router.query.course_id;

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

        const payload:Payload = { title:"", module:"", subject:"", thumbnail:"", class_name:"", price:"", old_price:"", language:"" }; 
        if(form[fieldToChange] === null){
            toast.error(`please select ${fieldToChange}`)
            return;
        }
        
        if(fieldToChange === "thumbnail"){
            payload[fieldToChange] = "true" ;
        }
        else{
            payload[fieldToChange] = form[fieldToChange] as string; 
        }

        try {
            const response = await axiosClient.post(`admin/edit-theory-course/${courseId}`, payload, {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            const presignedUrl = response.data.data.presignedUrl;
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


    const handleDeleteTheoryCourse = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //check if user has typed delete in the input box
        if(event?.currentTarget?.deletecourse?.value !== 'delete'){
            toast.error(`Please enter "delete" to delete the Theory Course`);
            return;
        }
        try {
            await axiosClient.delete(`admin/delete-theory-course/${courseId}`,{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success('Theory Course deleted successfully');
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
                            placeholder='Quadratic Equations'
                        />
                    </label>
                    <input type='submit' value={"Submit"} className='w-1/4 h-10 border-2 border-blue-500 text-blue-500 rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>

        {/* module  */}
        <div className=' bg-gray-300 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-black'
                onClick={() => handleTabSelection('module')}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Change Module</h3>
                <span className=' text-3xl font-bold'>{tabSelected === 'module' ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${tabSelected != 'module' && 'hidden'  } w-auto`}>
                <form onSubmit={(event) => handleContentSubmit(event,'module')} className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <p className='text-blue-600 text-lg cursor-pointer w-1/6 px-2 font-semibold'>New Module</p>
                        <input type="text" className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 ' name='module' required 
                            value={form.module}
                            onChange={(e) => setForm({...form, module: e.target.value})} 
                            placeholder='Calculas'
                        />
                    </label>
                    <input type='submit' value={"Submit"} className='w-1/4 h-10 border-2 border-blue-500 text-blue-500 rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>

        {/* Subject  */}
        <div className=' bg-gray-300 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-black'
                onClick={() => handleTabSelection('subject')}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Change Subject</h3>
                <span className=' text-3xl font-bold'>{tabSelected === 'subject' ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${tabSelected != 'subject' && 'hidden'  } w-auto`}>
                <form onSubmit={ event => handleContentSubmit(event,'subject')} className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <p className='text-blue-600 text-lg cursor-pointer w-1/6 px-2 font-semibold'>New Subject</p>
                        <select className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 ' name='subject' required 
                            value={form.subject}
                            onChange={(e) => setForm({...form, subject: e.target.value})}
                        >
                            <option value="" disabled defaultValue="">Select Subject</option>
                            <option value={"physics"}>Physics</option>
                            <option value={"chemistry"}>Chemistry</option>
                            <option value="mathematics">Mathematics</option>
                        </select>
                    </label>
                    <input type='submit' value={"Submit"} className='w-1/4 h-10 border-2 border-blue-500 text-blue-500 rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>

         {/* class_name  */}
         <div className=' bg-gray-300 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-black'
                onClick={() => handleTabSelection('class_name')}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Change Class Name</h3>
                <span className=' text-3xl font-bold'>{tabSelected === 'class_name' ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${tabSelected != 'class_name' && 'hidden'  } w-auto`}>
                <form onSubmit={(event) => handleContentSubmit(event,'class_name')} className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <p className='text-blue-600 text-lg cursor-pointer w-1/6 px-2 font-semibold'>New Class Name</p>
                        <input type="text" className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 ' name='class_name' required 
                            value={form.class_name}
                            onChange={(e) => setForm({...form, class_name: e.target.value})} 
                            placeholder='11th'
                        />
                    </label>
                    <input type='submit' value={"Submit"} className='w-1/4 h-10 border-2 border-blue-500 text-blue-500 rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>


        {/* old_price  */}
        <div className=' bg-gray-300 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-black'
                onClick={() => handleTabSelection('old_price')}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Change Price</h3>
                <span className=' text-3xl font-bold'>{tabSelected === 'old_price' ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${tabSelected != 'old_price' && 'hidden'  } w-auto`}>
                <form onSubmit={(event) => handleContentSubmit(event,'old_price')} className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <p className='text-blue-600 text-lg cursor-pointer w-1/6 px-2 font-semibold'>New Price</p>
                        <input type="text" className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 ' name='old_price' required 
                            value={form.old_price}
                            onChange={(e) => setForm({...form, old_price: e.target.value})} 
                            placeholder='&#8377; 450'
                        />
                    </label>
                    <input type='submit' value={"Submit"} className='w-1/4 h-10 border-2 border-blue-500 text-blue-500 rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>

        
        {/* price  */}
        <div className=' bg-gray-300 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-black'
                onClick={() => handleTabSelection('price')}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Change Discounted Price</h3>
                <span className=' text-3xl font-bold'>{tabSelected === 'price' ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${tabSelected != 'price' && 'hidden'  } w-auto`}>
                <form onSubmit={(event) => handleContentSubmit(event,'price')} className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <p className='text-blue-600 text-lg cursor-pointer w-1/6 px-2 font-semibold'>New Discounted Price</p>
                        <input type="text" className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 ' name='price' required 
                            value={form.price}
                            onChange={(e) => setForm({...form, price: e.target.value})} 
                            placeholder='&#8377; 500'
                        />
                    </label>
                    <input type='submit' value={"Submit"} className='w-1/4 h-10 border-2 border-blue-500 text-blue-500 rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>


        {/* language  */}
        <div className=' bg-gray-300 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-black'
                onClick={() => handleTabSelection('language')}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Change Language</h3>
                <span className=' text-3xl font-bold'>{tabSelected === 'language' ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${tabSelected != 'language' && 'hidden'  } w-auto`}>
                <form onSubmit={ event => handleContentSubmit(event,'language')} className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <p className='text-blue-600 text-lg cursor-pointer w-1/6 px-2 font-semibold'>New Language</p>
                        <select className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 ' name='language' required 
                            value={form.language}
                            onChange={(e) => setForm({...form, language: e.target.value})}
                        >
                            <option value="" disabled defaultValue="">Select Language</option>
                            <option value={"english"}>English</option>
                            <option value={"hindi"}>Hindi</option>
                            <option value="hinglish">Hinglish</option>
                        </select>
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


        {/* delete Theory Course  */}
        <div className=' bg-red-600 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-white'
                onClick={() => handleTabSelection('deletecourse')}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Delete Theory Course</h3>
                <span className=' text-3xl font-bold'>{tabSelected === 'deletecourse' ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${tabSelected != 'deletecourse' && 'hidden'  } w-auto`}>
                <form onSubmit={handleDeleteTheoryCourse} className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <input type="text" className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 ' name='deletecourse' required
                            placeholder={`Type "delete" to delete the Theory Course `}
                        />
                    </label>
                    <input type='submit' value={"Delete Theory Course"} className='w-1/4 h-10 border-2 border-white text-white rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>

    </div>
  )
}

export default EditTheory