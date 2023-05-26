import './App.css';
import { Controls } from './components/Controls';
import { Header } from './components/Header';
import { Main } from './components/Main';
import axios from 'axios'
import { useEffect, useState } from 'react';

import {Routes, Route} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Details } from './pages/Details';
import { NotFound } from './pages/NotFound';

function App() {

  const [countries,setCountries] = useState([]);


  return (
    <>
    <Header></Header>
    <Main>
      <Routes>
        <Route exact path='/' element={<HomePage countries={countries} setCountries={setCountries}></HomePage>}>
        </Route>
        <Route path='country/:name' element={<Details/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </Main>
    </>
  );
}

export default App;
