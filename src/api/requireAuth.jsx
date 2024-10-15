import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
    const session = sessionStorage.getItem('supabaseSession');
    console.info('session : ', session);
    if (!session) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default RequireAuth;