import React, { createContext, useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import store, { history } from './Redux'
import { Provider } from 'react-redux'
import Details from './Details'
import Counter from './Counter'
import { Link, Route } from 'react-router-dom'
import User from './User'
import Pokedex from './Pokedex'
import { ConnectedRouter } from 'connected-react-router'
import Home from './Home'
import SpecificPokemon from './SpecificPokemon'
import Forms from './Forms';
import Items from './Items';

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

function Recipient() {
  const data = useMyData()
  return <p>Data from source via context is -- {data}</p>
}

function Recipient2() {
  const data = useMyData()
  return <p> Recipient 2 got data from source -- {data}</p>
}

function Navigation() {
  return <div>
    <Link to="/">Home</Link>
    <Link to="/counter">Counter</Link>
    <Link to="/details">Details</Link>
    <Link to="/pokedex">Pokedex</Link>
    <Link to="/forms">Forms</Link>
    <Link to="/items">Items</Link>
  </div>
}

function App() {
  return <Provider store={store}>
    <ConnectedRouter history={history}>
      {/* <Source /> */}
      <Navigation />
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/counter">
        <Counter />
      </Route>
      <Route path="/details">
        <Details />
      </Route>
      <Route path="/user/:username">
        <User />
      </Route>
      <Route path="/pokedex" exact>
        <Pokedex />
      </Route>
      <Route path="/pokedex/:pokemonName/:pokemonIndex">
        <SpecificPokemon />
      </Route>
      <Route path="/forms">
        <Forms />
      </Route>
      <Route path="/items">
        <Items />
      </Route>
    </ConnectedRouter>
  </Provider>
}

export default App;
