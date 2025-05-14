import React, { useState } from 'react'
import logo from '../assets/logo.png';

function Profile() {
    const [profilePicture, setProfilePicture] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            const imageUrl= URL.createObjectURL(file);
            setProfilePicture(imageUrl);
        }
    };
  return (
    <div className='relative min-h-screen flex items-center justify-center'>
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 z-0">
            <img src={logo}
                 alt='logo'
                 className='w-[550px] h-[550px] p-1'
            />
            <h2 className='text-xl font-bold mb-16 text-white text-opacity-40'> "GameShoppers — Level Up Your Game Library."</h2> 
        </div>

      <div className='relative z-10 bg-gray-800 bg-opacity-30 backdrop-blur-md p-8 rounded-xl shadow-2xl w-[350px] h-[550px] mb-24'>
      <h2 className='text-2xl font-bold text-white text-opacity-40 mb-4'>Profile Settings</h2>
        <form className='flex flex-col gap-4'>
            <div className='flex justify-center mr-4'>
                <div className='relative w-24 h-24 mb-4 flex'>
                    <label className='w-full h-full rounded-full border-2 border-gray-800 border-dashed flex items-center justify-center cursor-pointer overflow-hidden'>
                        {profilePicture ? (
                            <img 
                                src={profilePicture}
                                alt='profile'
                                className='w-full h-full object-cover rounded-full border-2 border-white shadow:md'
                            />
                        ) : (
                            <span className='text-white opacity-50 text-4xl font-light'>+</span>    
                        )}     
                    <input
                        type='file'
                        accept='image/'
                        onChange={handleImageChange}
                        className='hidden'
                    />
                    </label>
                </div>
            </div>
            <input
                type='text'
                placeholder='Name'
                className='h-9 bg-gray-500 py-2 pl-2 pr-3 text-white focus:outline-none placeholder-white placeholder-opacity-70 p-4 border border rounded-md'
            />
            <input
                type='text'
                placeholder='Username'
                className='h-9 bg-gray-500 py-2 pl-2 pr-3 text-white focus:outline-none placeholder-white placeholder-opacity-70 p-4 border border rounded-md'
            />
            <input
                type='email'
                placeholder='Example@mail.com'
                className='h-9 bg-gray-500 py-2 pl-2 pr-3 text-white focus:outline-none placeholder-white placeholder-opacity-70 p-4 border border rounded-md'
            />
            <input
                type='contact'
                placeholder='Phone Number'
                className='h-9 bg-gray-500 py-2 pl-2 pr-3 text-white focus:outline-none placeholder-white placeholder-opacity-70 p-4 border border rounded-md'
            />
            <button
                type='submit'
                className='text-white border border-white-900 px-4 py-1 rounded hover:bg-black opacity-50 transition'
            >
                Save Changes
            </button>
            <button
                type='button'
                className='text-white border border-white-900 px-4 py-1 rounded hover:bg-white opacity-50 transition hover:text-black transition'
            >
                Discard Changes
            </button>
        </form>
      </div>
    </div>
  )
}

export default Profile;