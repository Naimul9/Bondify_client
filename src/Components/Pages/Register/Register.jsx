import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile, setUser } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const photo = form.photo.files[0];
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', photo);

      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`,
        formData
      );
      const photoURL = data.data.display_url;

      await createUser(email, password);
      await updateUserProfile(name, photoURL);

      const currentUser = { email, name, photo: photoURL };
      await axios.put(`${import.meta.env.VITE_API_URL}/user`, currentUser);
      setUser({ email, displayName: name, photoURL });

      navigate('/');
      toast.success('SignUp Successful');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Sign up failed');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
        <h2 className='text-center text-2xl font-semibold mb-6'>Sign Up</h2>

        <form onSubmit={handleSignUp}>
          <div className='mb-4'>
            <label className='block mb-2'>Username</label>
            <input
              name='name'
              type='text'
              className='w-full p-2 border rounded'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block mb-2'>Email Address</label>
            <input
              name='email'
              type='email'
              className='w-full p-2 border rounded'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block mb-2'>Photo</label>
            <input
              name='photo'
              type='file'
              className='w-full p-2 border rounded'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block mb-2'>Password</label>
            <input
              name='password'
              type='password'
              className='w-full p-2 border rounded'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block mb-2'>Confirm Password</label>
            <input
              name='confirmPassword'
              type='password'
              className='w-full p-2 border rounded'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full p-2 bg-red-600 text-white rounded hover:bg-red-700'
          >
            Sign Up
          </button>
        </form>

        <p className='text-center mt-4'>
          Already have an account?{' '}
          <Link to='/login' className='text-red-600 hover:underline'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
