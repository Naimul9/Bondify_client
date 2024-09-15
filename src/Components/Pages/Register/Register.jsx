import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import toast from 'react-hot-toast';

import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile, user, setUser } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const photo = form.photo.files[0];
    const pass = form.password.value;
    const confirmPass = form.confirmPassword.value;
    const formData = new FormData();
    formData.append('image', photo);

    try {
      const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`, formData);
      const photoURL = data.data.display_url;

      const currentUser = {
        email,
        name,
        photo: photoURL,
      
      };

      console.log(currentUser);

      if (pass !== confirmPass) {
        toast.error('Passwords do not match.');
        return;
      }

      await createUser(email, pass);
      await updateUserProfile(name, photoURL);
      await axios.put(`${import.meta.env.VITE_API_URL}/user`, currentUser);
      setUser({ ...user, photoURL, displayName: name });
      navigate('/');
      toast.success('SignUp Successful');
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'Sign up failed');
    }
  };

  

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-12'>
      <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-red-50 rounded-lg shadow-lg lg:max-w-4xl'>
        <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>
          <div className='flex justify-center mx-auto'>
            <img className='w-auto h-7 sm:h-8' src='' alt='' />
          </div>
          <p className='mt-3 text-xl text-center text-gray-600'>
            Get Your Free Account Now.
          </p>
          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b lg:w-1/4'></span>
            <div className='text-xs text-center text-gray-500 uppercase hover:underline'>
              or Registration with email
            </div>
            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
          </div>
          <form onSubmit={handleSignUp}>
            <div className='mt-4'>
              <label className='block mb-2 text-sm font-medium text-gray-600' htmlFor='name'>
                Username
              </label>
              <input
                id='name'
                autoComplete='name'
                name='name'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                type='text'
              />
            </div>
            <div className='mt-4'>
              <label className='block mb-2 text-sm font-medium text-gray-600' htmlFor='LoggingEmailAddress'>
                Email Address
              </label>
              <input
                id='LoggingEmailAddress'
                autoComplete='email'
                name='email'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                type='email'
              />
            </div>
            <div className='mt-4'>
              <label className='block mb-2 text-sm font-medium text-gray-600' htmlFor='photo'>
                Photo
              </label>
              <input
                id='photo'
                autoComplete='photo'
                name='photo'
                className='file-input file-input-bordered file-input-sm file-input-red w-full max-w-sm'
                type='file'
              />
            </div>
         
            <div className='mt-4'>
              <div className='flex justify-between'>
                <label className='block mb-2 text-sm font-medium text-gray-600' htmlFor='loggingPassword'>
                  Password
                </label>
              </div>
              <input
                id='loggingPassword'
                autoComplete='current-password'
                name='password'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                type='password'
              />
            </div>
            <div className='mt-4'>
            <div className='flex justify-between'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600'
                htmlFor='confirmPassword'
              >
                Confirm Password
              </label>
              </div>
              <input
                id='confirmPassword'
                autoComplete='new-password'
                name='confirmPassword'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                type='password'
                required
              />
            </div>
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full px-6 py-3 bg-red-700 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-red-800'
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b border-red-500 md:w-1/4'></span>
            <Link to='/login' className='text-xs text-gray-500 uppercase hover:underline'>
              or sign in
            </Link>
            <span className='w-1/5 border-b border-red-500 md:w-1/4'></span>
          </div>
        </div>
        <div
          className='hidden bg-cover bg-center lg:block lg:w-1/2'
          style={{ backgroundImage: 'url(/bloodBridge.png)' }}
        ></div>
      </div>
    </div>
  );
};

export default Register;
