import React from 'react';
import { List } from 'antd';
import { Box } from '@mui/material';
import { ChatMessage } from '../../types/ChatMessage';

interface MessageListProps {
    messages: ChatMessage[];
    messageListRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, messageListRef }) => {
    return (
        <div ref={messageListRef} style={{ maxHeight: 250, overflowY: 'auto', marginBottom: 16 }}>
            <List
                size="small"
                dataSource={messages}
                renderItem={(item) => (
                    <List.Item key={item.id} style={{ justifyContent: item.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                        <Box sx={{ padding: '8px 12px', borderRadius: '12px', backgroundColor: item.sender === 'user' ? '#FE0201' : '#e0e0e0', color: item.sender === 'user' ? '#fff' : '#000', maxWidth: '70%' }}>
                            {item.text}
                        </Box>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default MessageList;