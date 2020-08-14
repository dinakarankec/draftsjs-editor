import React from "react";
import styled from "styled-components";

const Mention = styled.div`
  display: inline;
  background-color: rgba(255, 255, 0, 0.5);
`;

const MentionComponent: React.FC<any> = (props) => {
  return <Mention>{props.children}</Mention>;
};

export default MentionComponent;
