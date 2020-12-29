import { Button, Flex, Spacer } from "@chakra-ui/react";
import { useFirebaseAuth } from "context/firebase/auth-context";
import React from "react";

function Header() {
  const { user, logout } = useFirebaseAuth();

  return (
    <Flex>
      <h1>Chat App</h1>
      <Spacer />
      {user && <div>{user.displayName}</div>}
      {user && <Button onClick={() => logout()}>Logout</Button>}
    </Flex>
  );
}

export default Header;
