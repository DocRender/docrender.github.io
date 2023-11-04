import React from "react";

import Code from "./codemirror";

declare type DevSideProps = {
  side: "schema" | "model" | "options" | "functions";
  content: any;
};

const DevSide: React.FC<DevSideProps> = ({ side, content }) => {
  return (
    <div className="dev-side">
      {side === "schema" && <Code value={content} lang="json" />}
      {side === "model" && <>Model</>}
      {side === "options" && <>Options</>}
      {side === "functions" && <>Functions</>}
    </div>
  );
};

export default DevSide;
