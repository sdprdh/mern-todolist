import InputCustom from '@/components/ui/InputCustom';
import { useAuthContext } from '@/hooks/context/useAuthContext';
import { useTodoContext } from '@/hooks/context/useTodoContext';
import { useTodoHandler } from '@/hooks/handler/useTodoHandler';
import { Button, Dialog, Heading, Portal } from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const AddButton = () => {
    const navigate = useNavigate();
    const { data: user } = useAuthContext();
    const { open, type, form, dispatch } = useTodoContext();

    const { handleAddTodo, handleUpdateTodo } = useTodoHandler();

    const handleCLickAddButton = (e) => {
        if (!user) {
            navigate('/login');
            return;
        }
        dispatch({ type: 'SET_TYPE', payload: 'add' });
        dispatch({ type: 'SET_OPEN', payload: e.open });
    };

    return (
        <Dialog.Root
            size='xs'
            lazyMount
            open={open}
            onOpenChange={(e) => handleCLickAddButton(e)}
        >
            <Dialog.Trigger asChild>
                <Button
                    position='sticky'
                    bottom={4}
                    left='100%'
                    zIndex='99999'
                    colorPalette='purple'
                    w='40px'
                    h='40px'
                    rounded='full'
                >
                    <LuPlus />
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content asChild>
                        <form onSubmit={type === 'add' ? handleAddTodo : handleUpdateTodo}>
                            <Dialog.Header>
                                <Dialog.Title
                                    asChild
                                    w='full'
                                >
                                    <Heading
                                        as='h2'
                                        textAlign='center'
                                    >
                                        NEW NOTE
                                    </Heading>
                                </Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <InputCustom
                                    name='title'
                                    placeholder='Input your note...'
                                    defaultValue={type === 'update' ? form?.title : ''}
                                />
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button
                                        variant='outline'
                                        colorPalette='purple'
                                        size='sm'
                                    >
                                        CANCEL
                                    </Button>
                                </Dialog.ActionTrigger>
                                <Button
                                    colorPalette='purple'
                                    size='sm'
                                    type='submit'
                                >
                                    APPLY
                                </Button>
                            </Dialog.Footer>
                        </form>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default AddButton;
