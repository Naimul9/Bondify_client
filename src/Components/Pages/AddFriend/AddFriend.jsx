import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';

const AddFriend = () => {
    const { user, loading } = useContext(AuthContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const usersResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
                setUsers(usersResponse.data);
                setFilteredUsers(usersResponse.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchAllUsers();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = users.filter(user =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    }, [searchQuery, users]);

    const sendFriendRequest = async (friend) => {
        try {
            const existingRequestsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/friendRequests/${user?.email}`);
            const existingRequests = existingRequestsResponse.data;

            const requestExists = existingRequests.some(request => 
                (request.friendEmail === friend.email || request.Email === friend.email) &&
                request.status === 'pending'
            );

            if (requestExists) {
                toast.error('Friend request already sent');
                return;
            }

            const requestData = {
                currentUserEmail: user?.email,
                friendId: friend._id,
                friendEmail: friend.email,
                Name: user?.displayName,
                Photo: user?.photoURL
            };

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/sendFriendRequest`, requestData);
            if (response.data.success) {
                toast.success('Friend request sent');
            } else {
                toast.error('Failed to send friend request.');
            }
        } catch (err) {
            console.error('Error sending friend request:', err);
            toast.error('Friend request already sent');
        }
    };

    useEffect(() => {
        const fetchAllFriendRequests = async () => {
            if (user?.email) {
                try {
                    const requestsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/friendRequests/${user.email}`);
                    const allRequests = requestsResponse.data;
                    setFriendRequests(allRequests);
                } catch (error) {
                    console.error('Error fetching friend requests:', error);
                }
            } else {
                console.error('User email is not available');
            }
        };

        if (!loading && user?.email) {
            fetchAllFriendRequests();
        }
    }, [user?.email, loading]);

    const acceptFriendRequest = async (requestId) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/updateFriendRequestStatus`, {
                requestId: requestId,
                status: 'accepted'
            });

            if (response.data.success) {
                toast.success('Friend request accepted');
                setFriendRequests(friendRequests.filter(req => req._id !== requestId));
            } else {
                toast.error('Failed to accept friend request.');
            }
        } catch (err) {
            toast.error('Error accepting friend request:', err);
        }
    };

    const declineFriendRequest = async (requestId) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/declineFriendRequest`, {
                requestId: requestId,
                status: 'declined'
            });

            if (response.data.success) {
                toast.success('Friend request declined');
                setFriendRequests(friendRequests.filter(req => req._id !== requestId));
            } else {
                toast.error('Failed to decline friend request.');
            }
        } catch (err) {
            toast.error('Error declining friend request:', err);
        }
    };

    return (
        <div className="container mx-auto px-4 mt-10">
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search users..."
                    className="input input-bordered w-full sm:w-96"
                />
            </div>

            <h1 className="text-2xl font-semibold mt-6 mb-4">Send Requests</h1>

            {/* Display search results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div key={user._id} className="card bg-base-100 shadow-xl p-4 text-center">
                            <img src={user.photo} alt={user.name} className="rounded-full w-24 h-24 mx-auto mb-2" />
                            <h3 className="text-lg font-bold">{user.name}</h3>
                            <p>{user.email}</p>
                            <button onClick={() => sendFriendRequest(user)} className="btn btn-success mt-4">
                                Send Friend Request
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 mt-6">
                        <p>No users found.</p>
                    </div>
                )}
            </div>

            <h1 className="text-2xl font-semibold mt-10 mb-4">Manage Requests</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {friendRequests.length > 0 ? (
                    friendRequests.map((req) => (
                        <div key={req._id} className="card bg-base-100 shadow-xl p-4 text-center">
                            <img src={req.Photo} alt={req.Name} className="rounded-full w-24 h-24 mx-auto mb-2" />
                            <h3 className="text-lg font-bold">{req.Name}</h3>
                            <p>{req.Email}</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                                <button
                                    onClick={() => acceptFriendRequest(req._id)}
                                    className="btn btn-success"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => declineFriendRequest(req._id)}
                                    className="btn btn-error"
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 mt-6">
                        <p>No friend requests available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddFriend;
