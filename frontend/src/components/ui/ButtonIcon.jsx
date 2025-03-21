import { IconButton } from '@chakra-ui/react';
import { useColorModeValue } from './color-mode';

const ButtonIcon = ({ icon, ...props }) => {
    const color = useColorModeValue('secondary', 'white');

    return (
        <IconButton
            unstyled
            fontSize='xs'
            cursor='pointer'
            color={color}
            {...props}
        >
            {icon}
        </IconButton>
    );
};

export default ButtonIcon;
