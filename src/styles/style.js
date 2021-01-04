import styled from "@emotion/styled";
import { PRIMARY_BLUE } from "./colors";

const RoundThumb = styled.img({
  width: 50,
});

const ChatBubble = styled("div")`
  margin: 5px auto;
  border-radius: 15px;
  background: ${({ isReply }) => (isReply ? PRIMARY_BLUE : "#fff")};
  color: ${({ isReply }) => (isReply ? "#fff" : "#000")};
  padding: 10px;
  text-align: center;
  position: relative;
`;

// border-left: 15px solid transparent;
// border-right: 15px solid #00bfb6;
// left: -16px;

// &:after {
//   content: "";
//   width: 0px;
//   height: 0px;
//   position: absolute;
//   border-left: 15px solid #00bfb6;
//   border-right: 15px solid transparent;
//   right: ${({ isReply }) => (isReply ? "-16px" : "auto")};
//   left: ${({ isReply }) => (isReply ? "auto" : "-16px")};
//   border-top: 15px solid #00bfb6;
//   border-bottom: 15px solid transparent;
//   top: 0px;
// }

export { RoundThumb, ChatBubble };
