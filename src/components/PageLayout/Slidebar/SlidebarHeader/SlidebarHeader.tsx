import { useContext } from "react";

import { CloseOutlined } from "@ant-design/icons";
import { UserInfoContext } from "../../../UserProvider/UserProvider";
import { toggleSlicebar } from "../../../../Store/utils/slidebarSlice";
import { Card } from "antd";
import { useDispatch } from "react-redux";
import { useUser } from "../../../../services/auth";

const SlidebarHeader = () => {
  const dispatch = useDispatch();

  const closeSlidebar = () => {
    dispatch(toggleSlicebar());
  };
  const { user } = useUser();
  // const userInfo = useContext(UserInfoContext);
console.log("user",user)
  return (
    <Card className="w-full h-[64px] animate-fadeIn rounded-none">
      <div className="flex justify-center items-center gap-4">
        <CloseOutlined onClick={closeSlidebar} />
        <span className="font-rubik text-text">{`${user?.name}`}</span>
      </div>
    </Card>
  );
};

export default SlidebarHeader;
