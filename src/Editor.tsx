import React, { useState, useRef, useEffect } from "react";
import DraftEditor from "draft-js-plugins-editor";
import { EditorState, RichUtils, convertToRaw } from "draft-js";
import createMentionPlugin from "draft-js-mention-plugin";
import "draft-js-mention-plugin/lib/plugin.css";

import Entry from "./Entry";
import Toolbar from "./Toolbar";
import MentionComponent from "./MentionComponent";
import styled from "styled-components";
import { stateToHTML } from "draft-js-export-html";

const EditorContainer = styled.div`
  height: 100%;
  border: 1px solid #ccc;
  margin-top: 5px;
  overflow-y: auto;

  .align-left {
    text-align: left;
  }

  .align-center {
    text-align: center;
  }

  .align-right {
    text-align: right;
  }

  .align-justify {
    text-align: justify;
  }

  &.RichEditor-editor .public-DraftEditorPlaceholder-root,
  &.RichEditor-editor .public-DraftEditor-content {
    margin: 0 -15px -15px;
    padding: 15px;
  }

  .RichEditor-hidePlaceholder .public-DraftEditorPlaceholder-root {
    display: none;
  }
`;

const MentionPlugin = createMentionPlugin({
  mentionPrefix: "@",
  supportWhitespaceAllows: true,
  entityMutability: "IMMUTABLE",
  mentionComponent: MentionComponent,
});

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: "line-through",
  },
};

const blockStyleFn = (contentBlock: any) => {
  const type = contentBlock.getType();
  if (type === "align-left") {
    return "align-left";
  }
  if (type === "align-center") {
    return "align-center";
  }
  if (type === "align-right") {
    return "align-right";
  }
  if (type === "align-justify") {
    return "align-justify";
  }
  return "";
};

interface EditorPropsI {
  placeholder?: string;
  getMentions?(value: string): Promise<any[]>;
  onAddMention?(ids: any[]): void;
  onChange(htmlStr: string): void;
}

const Editor = ({
  placeholder = "",
  getMentions,
  onAddMention,
  onChange,
}: EditorPropsI) => {
  const ref = useRef<any>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [suggestions, setSuggestions] = useState<any[]>([
    {
      name: "Jason",
    },
    {
      name: "Rob",
    },
  ]);
  const plugins = [MentionPlugin];

  let className = "RichEditor-editor";
  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }

  const getSuggestions = (search: any) => {
    if (typeof getMentions === "function") {
      getMentions(search).then((resp) => setSuggestions(resp));
    }
  };

  /**
   * TODO
   * Need to remove this method and handle the add mention from the useeffect
   * to handle remove mention
   */
  const handleMentions = (mention: any[]) => {
    if (typeof onAddMention === "function") {
      onAddMention(mention);
    }
  };

  useEffect(() => {
    onChange(stateToHTML(editorState.getCurrentContent()));
  }, [editorState, onChange]);

  return (
    <>
      <Toolbar
        editorState={editorState}
        updateEditorState={(editorState: EditorState) =>
          setEditorState(editorState)
        }
      />
      <EditorContainer
        className={className}
        onClick={() => ref.current?.focus()}
      >
        <DraftEditor
          blockStyleFn={blockStyleFn}
          customStyleMap={styleMap}
          plugins={plugins}
          editorState={editorState}
          onChange={(nextEditor) => setEditorState(nextEditor)}
          placeholder={placeholder}
          ref={ref}
        />
      </EditorContainer>
      <MentionPlugin.MentionSuggestions
        onAddMention={(mention: any) => handleMentions(mention)}
        suggestions={suggestions}
        onSearchChange={(search: any) => getSuggestions(search)}
        entryComponent={Entry}
      />
    </>
  );
};

export default Editor;
