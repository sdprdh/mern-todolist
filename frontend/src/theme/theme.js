import { createSystem, defaultConfig } from '@chakra-ui/react';

import '@fontsource/inter';
import '@fontsource/kanit';

export const system = createSystem(defaultConfig, {
    theme: {
        tokens: {
            fonts: {
                heading: { value: "'Kanit', sans-serif" },
                body: { value: "'Kanit', 'Inter', sans-serif" },
            },
            colors: {
                primary: { value: '#9333ea' },
                secondary: { value: '#C3C1E5' },
            },
        },
    },
});
