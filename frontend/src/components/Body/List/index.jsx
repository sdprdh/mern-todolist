import { useTodoContext } from '@/hooks/context/useTodoContext';
import { VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import EmptyState from './EmptyState';
import NoteItem from './NoteItem';

const ListNote = () => {
    const { data, filterData } = useTodoContext();

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        if (filterData.length > 0) {
            setTodos(filterData);
        } else {
            setTodos(data);
        }
    }, [filterData, data]);

    return (
        <VStack
            mx='auto'
            mt={6}
            as='section'
            w='540px'
            minH='400px'
            spaceY={4}
        >
            {todos.length > 0 ? (
                todos.map((todo, i) => (
                    <NoteItem
                        key={i}
                        todo={todo}
                    />
                ))
            ) : (
                <EmptyState />
            )}
        </VStack>
    );
};

export default ListNote;
