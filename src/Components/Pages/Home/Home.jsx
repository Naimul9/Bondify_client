import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const allUsers = async () => {
            try {
                const usersResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
                setUsers(usersResponse.data);
                setFilteredUsers(usersResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        allUsers();

        if (user?.email) {
            fetchFriends(user.email);
        }
    }, [user?.email]);

    useEffect(() => {
        if (searchQuery) {
            const filtered = users.filter((user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    }, [searchQuery, users]);

    const fetchFriends = async (email) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/friends/${email}`);
            setFriends(response.data);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    const Unfriend = async (requestId) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/unfriend`, { requestId });
            if (response.data.success) {
                setFriends(friends.filter((friend) => friend._id !== requestId));
                console.log('Unfriended successfully');
            } else {
                console.error('Failed to unfriend:', response.data.message);
            }
        } catch (error) {
            console.error('Error during unfriend operation:', error);
        }
    };

    return (
        <div className='mt-10 container mx-auto px-4'>
            {/* Search Bar */}
            <div className='flex justify-center sm:justify-end'>
                <label className="input input-bordered flex items-center gap-2 w-full sm:w-64">
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
                            clipRule="evenodd"
                        />
                    </svg>
                </label>
            </div>

            {/* Users List */}
            <h2 className='text-3xl font-semibold text-center bg-slate-100 h-14 flex justify-center items-center mt-5'>Users</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10'>
                {filteredUsers.map((user) => (
                    <div key={user.id} className="card bg-base-100 w-full shadow-xl">
                        <figure>
                            <img className='rounded-full w-32 mx-auto mt-4'
                                src={user.photo}
                                alt="User Avatar"
                            />
                        </figure>
                        <div className="card-body text-center">
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Friend List */}
            <div className='mt-16'>
                <h1 className='text-3xl font-semibold text-center bg-slate-100 h-14 flex justify-center items-center '>Friend List</h1>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 mb-20'>
                    {friends.map((friend) => (
                        <div key={friend._id} className="card bg-base-100 w-full shadow-xl">
                            <figure>
                                <img className='rounded-full w-32 mx-auto mt-4'
                                    src={friend.Photo}
                                    alt="Friend Avatar"
                                />
                            </figure>
                            <div className="card-body text-center">
                                <h2>{friend.Name}</h2>
                                <p>{friend.Email}</p>
                                <button
                                    onClick={() => Unfriend(friend._id)}
                                    className='btn btn-block mt-3'>
                                    Unfriend
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
