import { Button, Flex, Spacer } from "@chakra-ui/react";
import { useFirebaseAuth } from "context/firebase/auth-context";
import React from "react";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  const { user, logout } = useFirebaseAuth();

  function gotoUser(){
    history.push("/user");
  }
  
  function gotoHome(){
    history.push("/");
  }

  return (
    <Flex>
      <h1 onClick={gotoHome}>Chat App</h1>
      <Spacer />
      {user && <div onClick={gotoUser}>{user.displayName}</div>}
      {user && <Button onClick={() => logout()}>Logout</Button>}
    </Flex>
  );
}

export default Header;
