import React from 'react';
import { Row, Col, Grid } from 'antd';
const { useBreakpoint } = Grid;
interface InfoBlockProps {
  icon: React.ReactNode;
  count: number;
  label: string;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ icon, count, label }) => {

  const screen = useBreakpoint();
  return screen.xs ? (
    <MobileInfoBlock icon={icon} count={count} label={label} />
  ) : (
    <DestkopInfoBlock icon={icon} count={count} label={label} />
  );
}

const DestkopInfoBlock: React.FC<InfoBlockProps> = ({ icon, count, label }) => {
  return (<Row className="items-center h-full">
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
  )
}

const MobileInfoBlock: React.FC<InfoBlockProps> = ({ icon, count, label }) => {

  return (
    <Col xs={8} sm={4} md={4} className="flex items-center justify-center p-1 sm:p-2">
      <div className="flex items-center justify-start w-full">
        <div className="flex items-center justify-center text-red-500 bg-gray-100 rounded-full p-1 sm:p-2">
          {icon}
        </div>
        <div className="ml-2 text-xl sm:text-2xl font-bold">{count}</div>
      </div>
      {/* Скрываем label на мобильных экранах (xs и sm), отображаем на больших экранах */}
      <span className="hidden sm:block text-sm text-gray-500">{label}</span>
    </Col>
  )
};

export default InfoBlock;
