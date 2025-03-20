
import { RouterProvider } from "react-router-dom";
import './App.css'
import { Provider } from "react-redux";
import router from "./Router";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {


  return (
    <>
      <Provider store={store}>
        <ToastContainer/>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </>
  );
}

export default App
