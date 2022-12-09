import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AppLayout } from './components/AppLayout/AppLayout';
import { AppLoading } from './components/AppLoading/AppLoading';
import { AppNavbar } from './components/AppNavbar/AppNavbar';
import { ProductsTable } from './features/products';
import { SalesTable } from './features/sales';

export default function App() {
  return (
    <>
      <Router>
        <AppNavbar />
        <AppLayout>
          <Routes>
            <Route path="/" element={<AppLoading />} />
            <Route path="/products" element={<ProductsTable />} />
            <Route path="/sales" element={<SalesTable />} />
          </Routes>
        </AppLayout>
      </Router>
    </>
  );
}
