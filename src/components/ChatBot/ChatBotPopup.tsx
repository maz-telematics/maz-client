import React, { useState, useEffect, KeyboardEvent, useRef } from 'react';
import { Card, List } from 'antd';
import { Box, IconButton } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CloseIcon from '@mui/icons-material/Close';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import Suggestions from './Suggestions';
import { ChatMessage } from '../../types/ChatMessage';
import { getBotAnswer } from '../../utils/botResponses';

const ChatBotPopup: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const messageListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setOpen(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    const sendMessage = (text: string) => {
        if (!text.trim()) return;

        const userMessage: ChatMessage = { id: Date.now(), sender: 'user', text };
        const botResponse: ChatMessage = { id: Date.now() + 1, sender: 'bot', text: getBotAnswer(text) };

        setMessages((prev) => [...prev, userMessage, botResponse]);
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
            {!open ? (
                <IconButton onClick={() => setOpen(true)} sx={{ backgroundColor: '#FE0201', color: '#fff' }}>
                    <ChatBubbleIcon />
                </IconButton>
            ) : (
                <Card title={<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        Чат-помощник
                        <IconButton size="small" onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>}
                    style={{ width: 350 }}>
                    <MessageList messages={messages} messageListRef={messageListRef} />
                    <Suggestions onSuggestionClick={sendMessage} />
                    <ChatInput onSendMessage={sendMessage} />
                </Card>
            )}
        </Box>
    );
};

export default ChatBotPopup;