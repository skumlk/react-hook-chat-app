import React from "react";

function CenterContent({ children }) {
  return (
    <div className="flex h-screen">
      <div className="m-auto">{children}</div>
    </div>
  );
};

export { CenterContent }