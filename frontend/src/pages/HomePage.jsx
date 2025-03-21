import AddButton from '@/components/Body/AddButton/AddButton';
import ListNote from '@/components/Body/List';
import Header from '@/components/Header';
import { useAuthContext } from '@/hooks/context/useAuthContext';
import { useTodoContext } from '@/hooks/context/useTodoContext';
import { useAuthHandler } from '@/hooks/handler/useAuthHandler';
import TodoService from '@/services/TodoService';
import { Avatar, Button, HStack, Menu, Portal, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const HomePage = () => {
    const [searchParams, _] = useSearchParams();
    const { dispatch } = useTodoContext();
    const { data: user } = useAuthContext();
    const { handleLogout } = useAuthHandler();

    useEffect(() => {
        (async () => {
            const response = await TodoService.getTodos();

            let todos = response.data || [];

            const search = searchParams.get('search');

            if (search) {
                todos = todos.filter((todo) =>
                    todo.title.toLowerCase().includes(search.toLowerCase())
                );
            }

            dispatch({ type: 'SET_DATA', payload: todos });
        })();
    }, [dispatch, searchParams]);

    return (
        <>
            <HStack
                as='header'
                justify='end'
                position='sticky'
                top={4}
                right={4}
            >
                <Text>{user?.email}</Text>
                <Menu.Root>
                    <Menu.Trigger asChild>
                        <Button
                            unstyled
                            outline='none'
                            cursor='pointer'
                        >
                            <Avatar.Root>
                                <Avatar.Fallback name={user?.username} />
                            </Avatar.Root>
                        </Button>
                    </Menu.Trigger>
                    <Portal>
                        <Menu.Positioner>
                            <Menu.Content>
                                {user ? (
                                    <Menu.Item
                                        asChild
                                        value='logout'
                                    >
                                        <Button
                                            unstyled
                                            cursor='pointer'
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </Button>
                                    </Menu.Item>
                                ) : (
                                    <>
                                        <Menu.Item
                                            asChild
                                            value='login'
                                        >
                                            <Button
                                                unstyled
                                                cursor='pointer'
                                                asChild
                                            >
                                                <Link to='/login'>Login</Link>
                                            </Button>
                                        </Menu.Item>
                                        <Menu.Item
                                            asChild
                                            value='register'
                                        >
                                            <Button
                                                unstyled
                                                cursor='pointer'
                                                asChild
                                            >
                                                <Link to='/register'>Register</Link>
                                            </Button>
                                        </Menu.Item>
                                    </>
                                )}
                            </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>
            </HStack>
            <Header />
            <ListNote />
            <AddButton />
        </>
    );
};

export default HomePage;
