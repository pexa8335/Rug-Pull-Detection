import { BrowserRouter, Routes } from 'react-router-dom';
import { routes, renderRoutes } from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/authContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>{renderRoutes(routes)}</Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
