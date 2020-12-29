import React from "react";

function CenterContent({ children }) {
  return (
    <div className="flex h-screen">
      <div className="m-auto">{children}</div>
    </div>
  );
}

function getSuccessorQueryToSearch(query) {
  const result = query.replace(/.$/, (c) =>
    String.fromCharCode(c.charCodeAt(0) + 1)
  );
  return result;
}

export { CenterContent, getSuccessorQueryToSearch };
