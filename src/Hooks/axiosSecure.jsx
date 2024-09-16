
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/Provider/AuthProvider";


export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useContext(AuthContext)
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        console.log('req stopped by interceptors', token);
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    // interceptors  401  and 403 status 
    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async(error) => {
        const status = error.response.status
        console.log('status error', status);
        if (status === 401 || status === 403) {
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error)
    }
    )
    return axiosSecure
};

export default useAxiosSecure;