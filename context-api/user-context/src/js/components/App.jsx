import { useState, createContext, useEffect } from 'react';

import '../../css/App.css';

import Layout from './Layout';

// Create a more complex context for a username and a setter for that name
export const UserContext = createContext({
  username: '',
  setUsername: () => {}
});


export const TransactionsContext = createContext({
  transactions: [],
  setTransactions: () => {},
});


function App() {
  const [username, setUsername] = useState('Anonymous');

  // Create a value object for the context provider of the Usercontext
  const contextValue = {
    username: username,
    setUsername: (newName) => setUsername(newName)
  };

  return (
    /* 
      Wrap the app in the context provider of the Usercontext
      and pass it the value object as it's value
    */
    <UserContext.Provider value={contextValue}>
      <div className="App">

      <TransactionsContext.Provider value={{
        transactions: [],
        setTransactions: (transactions) => this.transactions = transactions
      }}>
        <Layout />
      </TransactionsContext.Provider>

      </div>
    </UserContext.Provider>
    
  );
}

export default App;
