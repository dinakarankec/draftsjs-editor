import React from "react";
import { EditorState, RichUtils } from "draft-js";
import classnames from "classnames";
import styled from "styled-components";

const STYLE_TYPE = {
  INLINE: "inline",
  BLOCK: "block",
};

const TOOLBAR_ACTIONS = [
  {
    type: STYLE_TYPE.INLINE,
    style: "BOLD",
    label: "Bold",
    iconClass: "rte-icon-bold",
  },
  {
    type: STYLE_TYPE.INLINE,
    style: "ITALIC",
    label: "Italics",
    iconClass: "rte-icon-italic",
  },
  {
    type: STYLE_TYPE.INLINE,
    style: "UNDERLINE",
    label: "Underline",
    iconClass: "rte-icon-underline",
  },
  {
    type: STYLE_TYPE.INLINE,
    style: "STRIKETHROUGH",
    label: "Strike",
    iconClass: "rte-icon-strikethrough",
  },
  {
    type: STYLE_TYPE.BLOCK,
    style: "ordered-list-item",
    label: "OL",
    iconClass: "rte-icon-list-ordered",
  },
  {
    type: STYLE_TYPE.BLOCK,
    style: "unordered-list-item",
    label: "UL",
    iconClass: "rte-icon-list-unordered",
  },
  {
    type: STYLE_TYPE.BLOCK,
    style: "header-one",
    label: "H1",
    iconClass: "",
  },
  {
    type: STYLE_TYPE.BLOCK,
    style: "header-two",
    label: "H2",
    iconClass: "",
  },
  {
    type: STYLE_TYPE.BLOCK,
    style: "header-three",
    label: "H3",
    iconClass: "",
  },
  {
    type: STYLE_TYPE.BLOCK,
    style: "align-left",
    label: "Align Left",
    iconClass: "rte-icon-text-align-left",
  },
  {
    type: STYLE_TYPE.BLOCK,
    style: "align-center",
    label: "Align Center",
    iconClass: "rte-icon-text-align-center",
  },
  {
    type: STYLE_TYPE.BLOCK,
    style: "align-right",
    label: "Align right",
    iconClass: "rte-icon-text-align-right",
  },
  {
    type: STYLE_TYPE.BLOCK,
    style: "align-justify",
    label: "Justify",
    iconClass: "rte-icon-text-align-justify",
  },
  {
    type: STYLE_TYPE.BLOCK,
    style: "blockquote",
    label: "Block Quote",
    iconClass: "rte-icon-quotes-right",
  },
  {
    type: STYLE_TYPE.BLOCK,
    style: "code-block",
    label: "Code",
    iconClass: "rte-icon-code",
  },
];

const StyledButton = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 2px;
  cursor: pointer;
  &.active,
  &.active-inline {
    background-color: #eeeeee;
  }
`;

const Toolbar: React.FC<{
  editorState: EditorState;
  updateEditorState(editorState: EditorState): void;
}> = ({ editorState, updateEditorState }) => {
  const onToolbarButtonClick = (evt: any, action: any) => {
    evt.preventDefault();
    switch (action.type) {
      case STYLE_TYPE.INLINE:
        return updateEditorState(
          RichUtils.toggleInlineStyle(editorState, action.style)
        );
      case STYLE_TYPE.BLOCK:
        return updateEditorState(
          RichUtils.toggleBlockType(editorState, action.style)
        );
    }
  };

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const inlineStyle = editorState.getCurrentInlineStyle();

  console.log(inlineStyle, blockType);

  return (
    <div style={{ display: "flex" }}>
      {TOOLBAR_ACTIONS.map((action) => (
        <div onMouseDown={(evt) => evt.preventDefault()}>
          <StyledButton
            className={classnames({
              active:
                blockType === action.style && action.type === STYLE_TYPE.BLOCK,
              "active-inline":
                inlineStyle.has(action.style) &&
                action.type === STYLE_TYPE.INLINE,
            })}
            onClick={(evt: any) => onToolbarButtonClick(evt, action)}
          >
            {action.iconClass ? (
              <i className={action.iconClass} />
            ) : (
              action.label
            )}
          </StyledButton>
        </div>
      ))}
    </div>
  );
};

export default Toolbar;
