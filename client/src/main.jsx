import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Home, Form, Note } from "./pages";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="note/:noteId" element={<Note />} />
            <Route path="form" element={<Form />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
