import { Icon, Input, InputGroup } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { PasswordInput } from '../ui/password-input';

const InputAuth = ({ icon, placeholder, type = 'text', ...props }) => {
    const borderColor = useColorModeValue('primary', 'white');
    const placeHolderColor = useColorModeValue('secondary', '#666666;');

    return (
        <InputGroup
            startElement={
                <>
                    <Icon
                        size='sm'
                        color={borderColor}
                    >
                        {icon}
                    </Icon>
                </>
            }
        >
            {type === 'password' ? (
                <PasswordInput
                    placeholder={placeholder}
                    size='sm'
                    _placeholder={{ color: placeHolderColor, fontFamily: 'Inter', fontWeight: 200 }}
                    _focus={{ outline: 'none' }}
                    borderColor={borderColor}
                    borderWidth='1px'
                    {...props}
                />
            ) : (
                <Input
                    placeholder={placeholder}
                    size='sm'
                    _placeholder={{ color: placeHolderColor, fontFamily: 'Inter', fontWeight: 200 }}
                    _focus={{ outline: 'none' }}
                    borderColor={borderColor}
                    borderWidth='1px'
                    type={type}
                    autoComplete='on'
                    {...props}
                />
            )}
        </InputGroup>
    );
};

export default InputAuth;
