import React, { createContext, useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import store from './Redux'

window.store = store;

const MyDataContext = createContext(null);


function useMyData() {
  const data = useContext(MyDataContext)
  return data;
}

function Source() {
  const [data, setData] = useState("I have some secret here.")
  return <MyDataContext.Provider value={data}>
    <Component1 />
  </MyDataContext.Provider>
}

function Component1() {
  return <div>
    <Component2 ></Component2>
    <Recipient2 />
  </div>
}

function Component2() {
  return <Recipient />
}

// function Recipient() {
//   return <MyDataContext.Consumer>
//     {(value) => {
//       return <p>Data from source via context is -- {value}</p>
//     }}
//   </MyDataContext.Consumer>
// }

function Recipient() {
  const data = useMyData()
  return <p>Data from source via context is -- {data}</p>
}

function Recipient2() {
  const data = useMyData()
  return <p> Recipient 2 got data from source -- {data}</p>
}

function App() {
  return <Source />
}

export default App;
