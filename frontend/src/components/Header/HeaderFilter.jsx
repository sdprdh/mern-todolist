import { useTodoContext } from '@/hooks/context/useTodoContext';
import { useTodoHandler } from '@/hooks/handler/useTodoHandler';
import { Button, Icon, Menu, Portal } from '@chakra-ui/react';
import { IoIosArrowDown } from 'react-icons/io';

const items = [
    { label: 'ALL', value: 'ALL' },
    { label: 'Complete', value: 'Complete' },
    { label: 'Incomplete', value: 'Incomplete' },
];

const HeaderFilter = () => {
    const { sort, dispatch } = useTodoContext();

    const { handleSortTodo } = useTodoHandler();

    const sortTodo = (e) => {
        handleSortTodo(e.value);

        dispatch({ type: 'SET_SORT', payload: e.value });
    };

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button
                    outline='none'
                    colorPalette='purple'
                    size='sm'
                >
                    {sort}{' '}
                    <Icon
                        size='xs'
                        mt={1}
                    >
                        <IoIosArrowDown />
                    </Icon>
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content minW='10rem'>
                        <Menu.RadioItemGroup
                            value={sort}
                            onValueChange={(e) => sortTodo(e)}
                        >
                            {items.map((item) => (
                                <Menu.RadioItem
                                    key={item.value}
                                    value={item.value}
                                >
                                    {item.label}
                                    <Menu.ItemIndicator />
                                </Menu.RadioItem>
                            ))}
                        </Menu.RadioItemGroup>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
};

export default HeaderFilter;
