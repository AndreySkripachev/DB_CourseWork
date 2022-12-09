import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AppLoading } from './components/AppLoading/AppLoading';
import { AppNavbar } from './components/AppNavbar/AppNavbar';
import { ProductsTable } from './features/products';

export default function App() {
  return (
    <>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<AppLoading />} />
          <Route path="/products" element={<ProductsTable />} />
        </Routes>
      </Router>
    </>
  );
}
