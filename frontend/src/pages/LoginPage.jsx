import AuthTemplate from '@/components/auth';
import { useAuthHandler } from '@/hooks/handler/useAuthHandler';

const LoginPage = () => {
    const { handleLogin } = useAuthHandler();
    
    return (
        <AuthTemplate
            type='login'
            onSubmit={handleLogin}
        />
    );
};

export default LoginPage;
