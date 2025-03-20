import React from 'react';
import { Button, Box, Stack } from '@mui/material';

interface SuggestionsProps {
    onSuggestionClick: (suggestion: string) => void;
}

const suggestions = ['Что такое система телематики?', 'Как подключить и начать пользоваться системой?', 'Как связаться с поддержкой?'];

const Suggestions: React.FC<SuggestionsProps> = ({ onSuggestionClick }) => {
    return (
        <Box mb={2}>
            <Stack direction="column" spacing={1}>
                {suggestions.map((suggestion) => (
                    <Button key={suggestion} variant="outlined" onClick={() => onSuggestionClick(suggestion)} style={{ color: '#FE0201', borderColor: '#FE0201' }}>
                        {suggestion}
                    </Button>
                ))}
            </Stack>
        </Box>
    );
};

export default Suggestions;