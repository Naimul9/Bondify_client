import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext)

    if(loading) {
        return <div className='flex items-center justify-center '> <span className="loading    loading-ring loading-lg"></span></div>
    }
   

    if(user){
        return children 
    }

    return <Navigate to="/login"></Navigate>
};



export default PrivateRoute;