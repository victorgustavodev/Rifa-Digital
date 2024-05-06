import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Campaign from './pages/campaign';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/produto' element={<Campaign/>} />
            <Route path='*' element={<h1>Not Found</h1>} />
        </Routes> 
    </BrowserRouter>
  );
}

export default App;