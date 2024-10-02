import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="bg-black min-h-screen h-fit w-screen">
            <Outlet />
        </div>
    );
}

export default App;
