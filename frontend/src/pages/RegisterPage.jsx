import AuthTemplate from '@/components/auth';
import { useAuthHandler } from '@/hooks/handler/useAuthHandler';

const RegisterPage = () => {
    const { handleRegister } = useAuthHandler();
    return (
        <AuthTemplate
            type='register'
            onSubmit={handleRegister}
        />
    );
};

export default RegisterPage;
