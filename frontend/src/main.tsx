import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from 'react-modal';

Modal.setAppElement('#root'); // Ensure this is set

createRoot(document.getElementById('root')!).render(

  <StrictMode>

    <Provider store={store}>
        <App />
        <ToastContainer />
    </Provider>
  </StrictMode>,
)
