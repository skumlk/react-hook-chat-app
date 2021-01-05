import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "services/auth";
import { PRIMARY_BLUE } from "styles/colors";
import { AuthUserThumb } from "components/User/UserThumb";

function Header() {
  const history = useHistory();
  const { user, logout } = useAuth();

  function gotoUser() {
    history.push("/user");
  }

  function gotoHome() {
    history.push("/");
  }

  return (
    <div
      className="flex item-center p-2 px-5"
      style={{ backgroundColor: PRIMARY_BLUE, height: "4rem" }}
    >
      <img src="/img/common/logo.png" />
      <div
        className="text-2xl font-bold flex items-center"
        onClick={gotoHome}
      >
        Chat App
      </div>
      <Spacer />
      {user && (
        <React.Fragment>
          <div className="flex justify-center	items-center"><AuthUserThumb onClick={gotoUser} /></div>
          <div className="mx-2 flex flex-col">
            <div
              className="font-2xl text-white	font-bold inline-block mb-1"
              onClick={gotoUser}
            >
              {user.displayName}
            </div>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Available
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => logout()}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default Header;
