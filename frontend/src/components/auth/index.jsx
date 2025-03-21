import { useAuthContext } from '@/hooks/context/useAuthContext';
import { Box, Button, Text } from '@chakra-ui/react';
import { LuUser } from 'react-icons/lu';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { TbLockPassword } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { ColorModeButton } from '../ui/color-mode';
import InputAuth from './InputAuth';

const AuthTemplate = ({ type, onSubmit }) => {
    const { error, loading } = useAuthContext();

    return (
        <Box
            mx='auto'
            as='section'
            w='260px'
            h='svh'
            display='flex'
            alignItems='center'
            justifyContent='center'
        >
            <Box
                spaceY={2}
                as='form'
                onSubmit={onSubmit}
            >
                <InputAuth
                    icon={<LuUser />}
                    placeholder='Username'
                    name='username'
                />
                {type === 'register' && (
                    <InputAuth
                        icon={<MdOutlineAlternateEmail />}
                        placeholder='Email'
                        type='email'
                        name='email'
                    />
                )}
                <InputAuth
                    icon={<TbLockPassword />}
                    placeholder='Password'
                    type='password'
                    name='password'
                />

                {error && (
                    <Text
                        fontSize='xs'
                        color='red.500'
                        fontFamily='Inter'
                    >
                        {error}
                    </Text>
                )}

                <Button
                    w='full'
                    size='sm'
                    colorPalette='purple'
                    type='submit'
                    disabled={loading}
                >
                    {type === 'register' ? 'Register' : 'Login'}
                </Button>

                <Text
                    fontFamily='Inter'
                    fontSize='xs'
                    mt={4}
                    textAlign='center'
                >
                    {type !== 'register' ? 'Do you have account' : 'Already have an account'}?{' '}
                    <Button
                        unstyled
                        asChild
                        color='primary'
                    >
                        <Link to={type === 'register' ? '/login' : '/register'}>
                            {type !== 'register' ? 'Register' : 'Login'}
                        </Link>
                    </Button>
                </Text>
            </Box>

            <Box
                position='fixed'
                top={4}
                right={4}
            >
                <ColorModeButton colorPalette='purple' />
            </Box>
        </Box>
    );
};

export default AuthTemplate;
