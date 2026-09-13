import { useState } from 'react';
import HubLogin from './HubLogin';
import { isHubAuthenticated } from '../auth/hubAuth';

function ProtectedRoute({ children }) {
  const [authed, setAuthed] = useState(() => isHubAuthenticated());

  if (!authed) {
    return <HubLogin onSuccess={() => setAuthed(true)} />;
  }

  return children;
}

export default ProtectedRoute;
