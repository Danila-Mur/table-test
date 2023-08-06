import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { NotFoundBlock } from './components/NotFoundBlock';
import { MainLayout } from './layouts/MainLayout';
import { Table } from './pages/Table';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="table" element={<Table />} />
        <Route path="*" element={<NotFoundBlock />} />
      </Route>
    </Routes>
  );
};
