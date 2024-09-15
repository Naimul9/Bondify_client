import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            Welcome to Bondify
            <Outlet/>
        </div>
    );
};

export default MainLayout;