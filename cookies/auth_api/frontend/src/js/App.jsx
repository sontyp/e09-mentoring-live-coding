import '../scss/App.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProtectedStuff from './components/ProtectedStuff';
import PrivateRoute from './services/PrivateRoute';

function App() {

  return (
    <div className="App">
      <div className='container mx-auto'>
        <h1 className='text-4xl text-center py-9'>Hello Authentication!</h1>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              {/* <Route index element={<h3>Index</h3>}/> */}
              <Route path='/login' element={<LoginForm />} />
              <Route path='/register' element={<RegisterForm />} />

              <Route element={<PrivateRoute />}>
                <Route path='/protected' element={<ProtectedStuff />} />
              </Route>
              
            </Route>
            
          </Routes>
        </BrowserRouter>

      </div>
    </div>
  );
}

export default App;
