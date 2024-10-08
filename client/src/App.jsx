import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="bg-black h-screen w-screen py-8 px-5">
            <Outlet />
        </div>
    );
}

export default App;
