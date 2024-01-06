import './App.css'
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import PokemonDetails from './PokemonDetails';
export default function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
        <Route>
          
          <Route path="/" element={<PokemonDetails />} />
        
        </Route>
        </Routes>
      </BrowserRouter>


    </main>
  )
}
