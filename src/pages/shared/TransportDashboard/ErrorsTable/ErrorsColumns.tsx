import { TableProps, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { ErrorData } from "../../../../Types/carTrackingTypes";  // Путь к типам данных

export const getErrorColumns = (
  isPlusUser: boolean,
  showModal: (fmi: string) => void
): TableProps<ErrorData>["columns"] => [
  {
    title: "Дата и время",
    dataIndex: "date",
    key: "date",
    render: (text: string) => (
      <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
    ),
  },
  {
    title: "Тип ошибки",
    dataIndex: "errors",
    key: "errors",
    render: (errors: any[]) => (
      <div className="flex flex-col gap-3">
        {errors.map((error, index) => (
          <div key={index} className="flex items-center gap-2">
            <span>{error.parameterNumber}</span>
            {isPlusUser && (
              <Tooltip title="Нажмите для подробностей">
                <span
                  className="flex items-center cursor-pointer"
                  onClick={() => showModal(error.status || "")}
                >
                  <InfoCircleOutlined className="text-[#1890ff]" />
                  <span className="ml-2 text-xs">
                    ({error.quantity} раз)
                  </span>
                </span>
              </Tooltip>
            )}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Статус ламп",
    render: (record: ErrorData) => {
      const lampStatuses = [
        { name: "Лампа 1", status: record.lamp1 },
        { name: "Лампа 2", status: record.lamp2 },
        { name: "Лампа 3", status: record.lamp3 },
        { name: "Лампа 4", status: record.lamp4 },
      ];

      return (
        <div className="flex flex-col gap-2">
          {lampStatuses.map((lamp, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full ${lamp.status === "Включена" ? "bg-green-500" : "bg-gray-400"}`}
              ></div>
              <span>{lamp.name}: {lamp.status}</span>
            </div>
          ))}
        </div>
      );
    },
  },
];
