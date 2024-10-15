import { Outlet } from 'react-router-dom';
import RequireAuth from '@api/requireAuth.jsx';

const ProtectedLayout = () => {
    return (
        <RequireAuth>
            <Outlet />
        </RequireAuth>
    );
};

export default ProtectedLayout;
