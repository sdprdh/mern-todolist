import { useTodoHandler } from '@/hooks/handler/useTodoHandler';
import { Icon } from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';
import { useSearchParams } from 'react-router-dom';
import InputCustom from '../ui/InputCustom';
import { useColorModeValue } from '../ui/color-mode';

const HeaderInputSearch = () => {
    const color = useColorModeValue('primary', 'white');

    const { handleSearchTodo } = useTodoHandler();

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <InputCustom
            name='search'
            placeholder='Searh note...'
            onInput={handleSearchTodo}
            value={searchParams.get('search') || ''}
            endElement={
                <>
                    <Icon
                        size='md'
                        color={color}
                    >
                        <CiSearch />
                    </Icon>
                </>
            }
        />
    );
};

export default HeaderInputSearch;
