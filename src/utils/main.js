import React from "react";
import { ErrorMessage } from "styles/style";

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

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function ShowError({ error }) {
  return error ? <ErrorMessage colorScheme="red">{error}</ErrorMessage> : null
}

export { CenterContent, getSuccessorQueryToSearch, validateEmail, ShowError };
