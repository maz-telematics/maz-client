import { Table, TableProps } from "antd";
import moment from "moment";
import { ErrorData } from "../../types/carTrackingTypes";

interface ErrorsProps {
  errors: ErrorData[];
}

const ErrorTable: React.FC<ErrorsProps> = ({ errors }) => {
  const errorColumns: TableProps<ErrorData>["columns"] = [
    {
      title: "Дата и время",
      dataIndex: "data",
      key: "data",
      render: (text: string) => (
        <span>{moment(text).format("YYYY-MM-DD-HH:mm:ss")}</span>
      ),
    },
    {
      title: "Код ошибки",
      dataIndex: "error_code",
      key: "error_code",
    },
    {
      title: "Тип ошибки",
      dataIndex: "error_type",
      key: "error_type",
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
    },
  ];
  return (
    <Table
      bordered
      columns={errorColumns}
      dataSource={errors}
      pagination={false}
    />
  );
};

export default ErrorTable;
