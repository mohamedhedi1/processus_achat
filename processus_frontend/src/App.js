import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/Login'
function App() {
  return (
    <>
    <BrowserRouter>
    
    <Routes>
      <Route index element={<Login></Login>}></Route>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      
    </Routes>
    </BrowserRouter>
  
  </>
   
      
      
  );
}

export default App;
