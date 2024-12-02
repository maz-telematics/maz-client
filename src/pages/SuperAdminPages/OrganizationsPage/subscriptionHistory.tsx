import React from 'react';
import { List, Typography } from 'antd';

export interface SubscriptionHistory {
    id: number;
    startDate: string; 
    endDate: string; 
    status: 'Активна' | 'Заблокирована'| "Планируется";
  }
interface SubscriptionHistoryListProps {
  history: SubscriptionHistory[];
}

const SubscriptionHistoryList: React.FC<SubscriptionHistoryListProps> = ({ history }) => {
  return (
    <List
      header={<div>История подписок</div>}
      bordered
      dataSource={history}
      renderItem={(item) => (
        <List.Item>
          <Typography.Text>
            {`Подписка с ${item.startDate} по ${item.endDate} - ${item.status}`}
          </Typography.Text>
        </List.Item>
      )}
    />
  );
};

export default SubscriptionHistoryList;