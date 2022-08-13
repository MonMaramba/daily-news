import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Home from './components/home';
import Contact from './components/contact';
import PostComponent from './components/posts';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        Yikes!!!!
        <Route path='/' element={<Home />} />
        <Route path='contact' element={<Contact />} />
        <Route path='article/:id' element={<PostComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;