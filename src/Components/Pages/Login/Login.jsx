import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthProvider';

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const [error, setError] = useState('');

  // Handle sign in
  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      await signIn(email.value, password.value);
      navigate('/');
      toast.success('SignIn Successful');
    } catch (err) {
      setError('Invalid email or password');
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-sm w-full shadow-lg p-6 rounded-lg'>
        <h2 className='text-center text-2xl font-semibold mb-6'>Login</h2>

        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

        <form onSubmit={handleSignIn}>
          <div className='mb-4'>
            <label className='block mb-2' htmlFor='email'>
              Email Address
            </label>
            <input
              id='email'
              name='email'
              type='email'
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block mb-2' htmlFor='password'>
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-red-700 text-white p-2 rounded hover:bg-red-800 transition'
          >
            Sign In
          </button>
        </form>

        <div className='text-center mt-4'>
          <Link to='/register' className='text-sm text-gray-500 hover:underline'>
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
