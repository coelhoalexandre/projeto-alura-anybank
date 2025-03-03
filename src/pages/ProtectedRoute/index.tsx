import { Outlet, useNavigate } from 'react-router';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const ProtectedRoute = () => {
  const { session } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) return;

    toast.error('Pagina Protegida! Login necessário.');
    navigate('/auth/login');
  }, [session, navigate]);

  return <Outlet />;
};
