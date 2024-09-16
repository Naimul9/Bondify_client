import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    // Fetch initial users and friends list on component mount
    useEffect(() => {
        const allUsers = async () => {
            try {
                // Fetch all users
                const usersResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
                setUsers(usersResponse.data);
                setFilteredUsers(usersResponse.data); // Initially, filteredUsers should be the same as users
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        allUsers();
    }, []);

    // Update filtered users based on search query
    useEffect(() => {
        if (searchQuery) {
            const filtered = users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users); // Reset to all users if search query is empty
        }
    }, [searchQuery, users]);

    return (
        <div className='mt-10 container mx-auto'>
            {/* Search Bar */}
            <div className='flex justify-end mr-10'>
                <label className="input input-bordered flex items-center gap-2 w-64 ">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>
            </div>

            {/* Users List */}
            <h2 className='text-2xl font-semibold mt-10 text-center '>Users</h2>
            
            <div className='grid grid-cols-4 mt-20'>
                {filteredUsers.map((user) => (
                    <div key={user.id} className="card bg-base-100 w-64 shadow-xl">
                        <figure>
                            <img className='rounded-full w-32'
                                src={user.photo}
                                alt="User Avatar" />
                        </figure>
                        <div className="card-body">
                            <h2 className="text-center">{user.name}</h2>
                            <p className='text-center'>{user.email}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Friend List */}
            <div>
                <h1 className='text-3xl font-semibold mt-10 text-center'>Friend List</h1>
            </div>
        </div>
    );
};

export default Home;
