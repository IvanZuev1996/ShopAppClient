import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import ProdactList from './pages/ProdactList';
import Product from './pages/Product';
import Register from './pages/Register';
import Success from './pages/Success';
import './styles/App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ScrollToTop from './components/UI/ScrollToTop/ScrollToTop';
import UserAccount from './pages/UserAccount';

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate replace to="/" /> : <Register />}
        />
        <Route path="/products/:category" element={<ProdactList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/success" element={<Success />} />
        <Route path="/personal" element={<UserAccount />} />
        <Route
          path="/personal/lovelist"
          element={<UserAccount activeRoute="Love" />}
        />
        <Route
          path="/personal/orders"
          element={<UserAccount activeRoute="Orders" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
