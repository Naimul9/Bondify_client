import { useEffect, useState } from 'react';
import axios from 'axios';

const AddFriend = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                // Fetch all users
                const usersResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
                setUsers(usersResponse.data);
                setFilteredUsers(usersResponse.data); // Initially set filtered users to all users
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchAllUsers();
    }, []);

    // Update filtered users based on search query
    useEffect(() => {
        if (searchQuery) {
            const filtered = users.filter(user =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users); // Reset to all users if the search query is empty
        }
    }, [searchQuery, users]);

    // Simulated send friend request function (you should replace this with your API call)
    const sendFriendRequest = (userId) => {
        console.log(`Sending friend request to user with ID: ${userId}`);
        // Add your API call logic here
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="flex justify-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search users..."
                    className="input input-bordered w-full max-w-xs"
                />
            </div>

            {/* Display search results */}
            <div className="grid grid-cols-3 gap-4 mt-10">
                {filteredUsers.map((user) => (
                    <div key={user._id} className="card bg-base-100 shadow-xl p-4">
                        <h3 className="text-lg font-bold">{user.name}</h3>
                        <p>{user.email}</p>
                        <button onClick={() => sendFriendRequest(user._id)} className="btn btn-success mt-4">
                            Send Friend Request
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddFriend;
