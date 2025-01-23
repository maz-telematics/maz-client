import React from 'react';
import { Row, Col } from 'antd';

interface InfoBlockProps {
  icon: React.ReactNode;
  count: number;
  label: string;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ icon, count, label }) => (
  <Row className="items-center h-full">
    <Col
      span={1}
      className="flex items-center justify-center text-red-500 text-4xl bg-gray-100 rounded-full"
    >
      {icon}
    </Col>
    <Col span={20} className="flex flex-col justify-between h-full text-left max-w-full ml-3">
      <span className="text-2xl font-bold">{count}</span>
      <span className="text-sm text-gray-500">{label}</span>
    </Col>
  </Row>
);

export default InfoBlock;
