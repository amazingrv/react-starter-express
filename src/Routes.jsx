import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import DataTable from './components/DataTable';
import Counter from './components/Counter';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<Home />} />
        <Route path="table" element={<DataTable />} />
        <Route path="counter" element={<Counter />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
