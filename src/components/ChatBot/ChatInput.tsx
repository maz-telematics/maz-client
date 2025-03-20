import React, { useState, KeyboardEvent } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface ChatInputProps {
    onSendMessage: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        onSendMessage(inputValue);
        setInputValue('');
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <Box display="flex" gap={1}>
            <TextField fullWidth variant="outlined" placeholder="Введите сообщение..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} size="small" />
            <Button variant="contained" onClick={handleSend} sx={{ backgroundColor: '#FE0201' }}>
                Отправить
            </Button>
        </Box>
    );
};

export default ChatInput;