import { Input, InputGroup } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';

const InputCustom = ({ placeholder, startElement, endElement, ...props }) => {
    const borderColor = useColorModeValue('primary', 'white');
    const placeHolderColor = useColorModeValue('secondary', '#666666;')

    return (
        <InputGroup
            startElement={startElement}
            endElement={endElement}
        >
            <Input
                size='sm'
                ps={4}
                placeholder={placeholder}
                _placeholder={{ color: placeHolderColor, fontFamily: 'Inter', fontWeight: 200 }}
                _focus={{ outline: 'none' }}
                borderColor={borderColor}
                borderWidth='1px'
                {...props}
            />
        </InputGroup>
    );
};

export default InputCustom;
