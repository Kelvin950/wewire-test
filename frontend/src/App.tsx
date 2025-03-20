
import { RouterProvider } from "react-router-dom";
import './App.css'
import { Provider } from "react-redux";
import router from "./Router";
import { store } from "./store";

function App() {


  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </>
  );
}

export default App
