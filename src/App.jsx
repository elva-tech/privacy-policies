import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Home from './pages/Home';
import PolicyPage from './pages/PolicyPage';
import NotFound from './pages/NotFound';

function LegacyPrivacyPolicyRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/${slug}`} replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/404" element={<NotFound />} />
      <Route
        path="/privacy-policy/:slug"
        element={<LegacyPrivacyPolicyRedirect />}
      />
      <Route path="/:slug" element={<PolicyPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;