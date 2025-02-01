import React, { useState, useEffect, KeyboardEvent, useRef } from 'react';
import { Card, List } from 'antd';
import { TextField, Button, Box, Stack, IconButton } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CloseIcon from '@mui/icons-material/Close';

interface ChatMessage {
    id: number;
    sender: 'user' | 'bot';
    text: string;
}

const getBotAnswer = (question: string): string => {
    const q = question.toLowerCase().trim();

    if (q.includes('телематика') || q.includes('что такое система телематики') || q.includes('что делает система телематики') || q.includes('что она отслеживает')) {
        return 'Система телематики позволяет собирать данные с транспортных средств, включая параметры работы двигателя, ошибки, местоположение, скорость, маршруты и другие данные для мониторинга и анализа.';
    } else if (q.includes('как подключить') || q.includes('как начать пользоваться системой')) {
        return 'Для начала работы с системой необходимо установить телематическое устройство в транспортное средство, подключить его к системе через веб-интерфейс и настроить личный кабинет для отслеживания данных.';
    } else if (q.includes('контакты') || q.includes('как связаться с поддержкой')) {
        return 'Вы можете связаться с нашей поддержкой по телефону: +375 (29) 123-45-67 или по электронной почте: support@telematics.com.';
    } else {
        return 'Извините, но я не могу ответить на ваш вопрос. Вы можете обратиться к нам по телефону: +375 (29) 123-45-67 или по электронной почте: support@telematics.com.';
    }
};

const ChatBotPopup: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState<string>('');  
    const [open, setOpen] = useState<boolean>(false);

    const suggestions: string[] = [
        'Что такое система телематики?',
        'Как подключить и начать пользоваться системой?',
        'Как связаться с поддержкой?',
    ];

    // Ссылка на контейнер сообщений
    const messageListRef = useRef<HTMLDivElement>(null);

    // Открываем окно через 5 секунд после загрузки компонента
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const sendMessage = (text: string) => {
        if (!text.trim()) return;

        const userMessage: ChatMessage = { id: Date.now(), sender: 'user', text };
        setMessages((prev) => [...prev, userMessage]);

        const botResponse: ChatMessage = {
            id: Date.now() + 1,
            sender: 'bot',
            text: getBotAnswer(text),
        };
        setMessages((prev) => [...prev, botResponse]);
    };

    const handleSend = () => {
        sendMessage(inputValue);
        setInputValue('');
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        sendMessage(suggestion);
    };

    // Прокручиваем до последнего сообщения
    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]); // Этот эффект сработает каждый раз, когда добавляется новое сообщение

    return (
        <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
            {!open && (
                <IconButton
                    onClick={() => setOpen(true)}
                    sx={{
                        backgroundColor: '#FE0201',
                        color: '#fff',
                        boxShadow: 2,
                        '&:hover': { backgroundColor: '#d00202' },
                    }}
                >
                    <ChatBubbleIcon />
                </IconButton>
            )}

            {open && (
                <Card
                    title={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Чат-помощник
                            <IconButton size="small" onClick={() => setOpen(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    }
                    style={{ width: 350, borderRadius: 8 }}
                >
                    <div ref={messageListRef} style={{ maxHeight: 250, overflowY: 'auto', marginBottom: 16 }}>
                        <List
                            size="small"
                            dataSource={messages.length === 0 ? [''] : messages}  // Показываем текст по умолчанию, если нет сообщений
                            renderItem={(item, index) => (
                                <List.Item
                                    key={index}
                                    style={{
                                        justifyContent: item.sender === 'user' ? 'flex-end' : 'flex-start',
                                    }}
                                >
                                    <Box
                                        component="div"
                                        sx={{
                                            padding: '8px 12px',
                                            borderRadius: '12px',
                                            backgroundColor: item.sender === 'user' ? '#FE0201' : '#e0e0e0',
                                            color: item.sender === 'user' ? '#fff' : '#000',
                                            maxWidth: '70%',
                                            textAlign: 'left', // Выровняли текст по левому краю
                                        }}
                                    >
                                        {item === '' ? (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    height: '100%',
                                                    fontStyle: 'italic',
                                                    color: '#808080',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                Привет! Чем могу помочь? Задайте вопрос.
                                            </Box>
                                        ) : (
                                            item.text
                                        )}
                                    </Box>
                                </List.Item>
                            )}
                        />
                    </div>

                    <Box mb={2}>
                        <Stack direction="column" spacing={1}>
                            {suggestions.map((suggestion) => (
                                <Button
                                    key={suggestion}
                                    variant="outlined"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    style={{
                                        marginBottom: 8,
                                        color: '#FE0201',
                                        borderColor: '#FE0201',
                                        textAlign: 'center',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                    }}
                                    size="small"
                                >
                                    {suggestion}
                                </Button>
                            ))}
                        </Stack>
                    </Box>

                    <Box display="flex" gap={1}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Введите сообщение..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            size="small"
                        />
                        <Button
                            variant="contained"
                            onClick={handleSend}
                            sx={{
                                backgroundColor: '#FE0201',
                                '&:hover': { backgroundColor: '#d00202' },
                                fontSize: '12px',  // Уменьшили размер текста
                            }}
                        >
                            Отправить
                        </Button>
                    </Box>
                </Card>
            )}
        </Box>
    );
};

export default ChatBotPopup;
