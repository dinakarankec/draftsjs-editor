import * as React from "react";
import "./styles.css";
import "./assets/icons/style.css";
import "draft-js/dist/Draft.css";
import Editor from "./Editor";

const getMentions = async (value: string) => {
  console.log(value);
  return [
    {
      name: "Jason",
      id: 10,
    },
    {
      name: "Mathew",
      id: 11,
    },
    {
      name: "Steve",
      id: 10,
    },
  ];
};

export default function App() {
  return (
    <div className="App">
      <Editor
        getMentions={getMentions}
        placeholder="Add your Comment"
        onAddMention={(ids: any[]) => console.log(ids)}
        onChange={(htmlStr: string) => console.log(htmlStr)}
      />
    </div>
  );
}
