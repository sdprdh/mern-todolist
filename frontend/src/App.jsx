import { Container } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
    const { pathname } = useLocation();

    return (
        <Container
            mt={pathname !== '/' && -14}
            as='main'
            minH='svh'
            w={pathname === '/' && '750px'}
            position='relative'
        >
            <Outlet />
        </Container>
    );
}

export default App;
