import React  from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINT1 } from '../utils/constant';
function Signup() {
   
const [name , setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [role,setRole] = useState('');

const navigate = useNavigate();

const submitHandler = async (e) =>{
    e.preventDefault();
   
try {
    const response = await axios.post(`${API_ENDPOINT1}/signup`,{username:name , email,password , role});
   console.log( "user signed up" ,response.data);
   if(role == 'User'){

    navigate('/');
   }else if(role == 'Tenant'){
    navigate('/TenantRoomDetails');
   }
} catch (error) {
    console.error('Error during signup :',  error.message);   
}

} 



  return (
    <>
     <div className="flex mt-14 items-center justify-center p-12  ">

    <div className="mx-auto w-full max-w-[550px] bg-white border-2  p-10 rounded-sm  border-solid border-black">
       
      
       <form onSubmit={submitHandler}>
            
            <div className='w-full px-3 sm:w-1/2 '>
               <button
                         className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                         <div className="bg-white p-2 rounded-full">
                             <svg className="w-4" viewBox="0 0 533.5 544.3">
                                 <path
                                     d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                     fill="#4285f4" />
                                 <path
                                     d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                     fill="#34a853" />
                                 <path
                                     d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                     fill="#fbbc04" />
                                 <path
                                     d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                     fill="#ea4335" />
                             </svg>
                         </div>
                         <span className="ml-4">
                             Sign Up with Google
                         </span>
                     </button>

   </div>

         <div className="mb-5   ">
             <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                 Full Name
             </label>
             <input type="text" onChange={(e) =>{ setName(e.target.value)}} value={name}  name="name" id="name" placeholder="Full Name"
                 className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
         </div>

         <div className="mb-5">
             <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                 Email Address
             </label>
             <input type="email"  onChange={(e) =>{ setEmail(e.target.value)}}  value={email} name="email" id="email" placeholder="Enter your email"
                 className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
         </div>


         <div className="mb-5">
             <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                 Role
             </label>
             <input type="text"  onChange={(e) =>{ setRole(e.target.value)}}  value={role} name="role" id="role" placeholder="Role"
                 className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
         </div>
      
                <div className="mb-5" >
         <label htmlFor="password" className="b-3 block text-base font-medium text-[#07074D]">
             Password
             </label>
                          
                     <input id="password" onChange={(e) => { setPassword(e.target.value)}} value={password} name="password" type="password" required="" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
     
         </div>
      
         <div>
             <button
                 className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                 Submit
             </button>
         </div>



     </form>
       
    </div>
</div>
    </>
  )
}

export default Signup