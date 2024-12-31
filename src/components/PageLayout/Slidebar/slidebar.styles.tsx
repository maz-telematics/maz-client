import { Menu } from "antd";
import styled from "styled-components";

export const OpenSlideBarButton = styled.button`
  background: rgb(68, 68, 68);
  height: 64px;
  line-height: 64px;
  border: none;
`;

export const StyledMenu = styled(Menu)`
  height: 100%;
  padding-top: 25px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 64px;
  font-weight: bold;
`;
