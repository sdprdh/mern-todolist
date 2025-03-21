import { useTodoContext } from '@/hooks/context/useTodoContext';
import { useTodoHandler } from '@/hooks/handler/useTodoHandler';
import { Checkbox, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { GoTrash } from 'react-icons/go';
import { MdOutlineEdit } from 'react-icons/md';
import ButtonIcon from '../../ui/ButtonIcon';

const NoteItem = ({ todo }) => {
    const { sort, dispatch } = useTodoContext();

    const { handleUpdateIsComplete, handleDeleteTodo } = useTodoHandler();

    const [checked, setChecked] = useState(todo.isComplete);

    const handleCLickUpdateButton = () => {
        dispatch({ type: 'SET_TYPE', payload: 'update' });
        dispatch({ type: 'SET_FORM', payload: todo });
        dispatch({ type: 'SET_OPEN', payload: true });
    };

    const handleChecked = (e, todo) => {
        handleUpdateIsComplete(todo);
        setChecked(!!e.checked);
    };

    useEffect(() => {
        if (sort === 'Complete') {
            setChecked(true);
        } else if (sort === 'Incomplete') {
            setChecked(false);
        } else {
            setChecked(todo.isComplete);
        }
    }, [sort, todo]);

    return (
        <HStack
            w='full'
            pb={3}
            borderBottomColor='primary'
            borderBottomWidth='1px'
        >
            <Checkbox.Root
                colorPalette='purple'
                size='sm'
                checked={checked}
                onCheckedChange={(e) => handleChecked(e, todo)}
            >
                <Checkbox.HiddenInput />
                <Checkbox.Control
                    borderColor='primary'
                    cursor='pointer'
                />
                <Checkbox.Label fontWeight='medium'>{todo.title}</Checkbox.Label>
            </Checkbox.Root>

            <HStack ms='auto'>
                <ButtonIcon
                    icon={<MdOutlineEdit />}
                    aria-label='Edit note'
                    onClick={handleCLickUpdateButton}
                />
                <ButtonIcon
                    icon={<GoTrash />}
                    aria-label='Delete note'
                    onClick={() => handleDeleteTodo(todo._id)}
                />
            </HStack>
        </HStack>
    );
};

export default NoteItem;
