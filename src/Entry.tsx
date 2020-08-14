import React from "react";
import styled from "styled-components";

const Item = styled.div`
  border: 1px solid #ccc;
  box-shadow: 0px 0px 0px #000000;
  width: 250px;
`;

const Entry = (props: any) => {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line no-unused-vars
    isFocused, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;

  return (
    <Item {...parentProps}>
      <div>{mention.name}</div>
    </Item>
  );
};

export default Entry;
