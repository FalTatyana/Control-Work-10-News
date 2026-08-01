import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import App from './App';
import { store } from './app/store';



createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="bottom-right"
      />
    </BrowserRouter>
  </Provider>
);
