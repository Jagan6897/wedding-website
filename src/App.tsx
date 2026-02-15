import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicHome from './components/PublicHome';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import ManageLiveStream from './components/admin/ManageLiveStream';
import ManageGallery from './components/admin/ManageGallery';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<PublicHome />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="livestream" element={<ManageLiveStream />} />
          <Route path="images" element={<ManageGallery />} />
          {/* Placeholder routes for others */}
          <Route path="*" element={<div style={{ padding: '2rem' }}>🚧 This section is under construction</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
