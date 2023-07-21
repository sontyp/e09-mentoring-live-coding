import { CookiesProvider } from 'react-cookie';

import '../../css/App.css';

import Layout from './Layout';

function App() {


  return (
    <CookiesProvider>
      <h1>Hello Cookies!</h1>

      <Layout />
    </CookiesProvider>
  );
}

export default App;
