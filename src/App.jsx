import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/privacy-policy/:slug"
        element={<PrivacyPolicy />}
      />

      <Route
        path="/404"
        element={<NotFound />}
      />

      <Route
        path="*"
        element={<Navigate to="/404" replace />}
      />
    </Routes>
  );
}

export default App;