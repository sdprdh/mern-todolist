import { Box, HStack } from '@chakra-ui/react';
import { ColorModeButton } from '../ui/color-mode';
import HeaderFilter from './HeaderFilter';
import HeaderInputSearch from './HeaderInputSearch';
import HeaderTitle from './HeaderTitle';

const Header = () => {
    return (
        <Box
            as='section'
            spaceY={4}
            mt={16}
        >
            <HeaderTitle />
            <HStack>
                <HeaderInputSearch />
                <HeaderFilter />
                <ColorModeButton colorPalette='purple' />
            </HStack>
        </Box>
    );
};

export default Header;
