import { Outlet } from 'react-router-dom';
import { Footer } from './components/footer';

function App() {
    return (
        <div className="bg-black h-screen w-screen overflow-y-scroll">
            <Outlet />
            <Footer />
        </div>
    );
}

export default App;
