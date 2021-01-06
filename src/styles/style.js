import styled from "@emotion/styled";
import { ERROR_RED_1, ERROR_RED_2, ERROR_RED_3, PRIMARY_BLUE, PRIMARY_GRAY } from "./colors";

const RoundThumb = styled("img")
  `min-width: ${({ size }) => size === "small" ? "42px" : "128px"};
   width: ${({ size }) => size === "small" ? "42px" : "128px"};`;

const ChatBubble = styled("div")`
  margin: 5px auto;
  border-radius: 15px;
  background: ${({ isReply }) => (isReply ? PRIMARY_BLUE : "#fff")};
  color: ${({ isReply }) => (isReply ? "#fff" : "#000")};
  text-align: ${({ isReply }) => (isReply ? "right" : "left")};
  padding: 10px;
  position: relative;
`;

const Dot = styled("div")`
  height: 8px;
  width: 8px;
  background-color: ${({ isAvailable }) => isAvailable ? 'green' : '#bbb'};
  border-radius: 50%;
  display: inline-block;
`
const ChatItemli = styled("li")`
  background-color: ${({ isSelected }) => isSelected ? PRIMARY_GRAY : 'white'};
`

const AutoCompleteItem = styled.li(
  `padding: 0.5rem;`
)
const AutoCompleteItemList = styled("ul")`
  border: 1px solid ${PRIMARY_GRAY}
`

const ErrorMessage = styled.div(
  `
   color:  ${ERROR_RED_1};
   background-color:  ${ERROR_RED_3};
   border-color:  ${ERROR_RED_2};
   padding: .75rem 1.25rem;
   border: 1px solid transparent;
   border-radius: .25rem;
  `
)

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

export { RoundThumb, ChatBubble, Dot, ChatItemli, AutoCompleteItem, AutoCompleteItemList, ErrorMessage };
