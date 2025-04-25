import { Link, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Recipe from './Recipes';
import Login from './Login';
import Footer from './Footer';
import Header from './Header';


function Display() {
  return (
    <>
      <Header></Header>
      
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/recipes" element={<Recipe />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer></Footer>
        </>
  );
}

export default Display;
