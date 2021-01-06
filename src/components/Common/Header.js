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
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "services/auth";
import { PRIMARY_BLUE } from "styles/colors";
import { AuthUserThumb } from "components/User/UserThumb";

function Header() {
  const history = useHistory();
  const { user, logout } = useAuth();

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
        className="text-xl font-bold flex items-center cursor-pointer"
        onClick={gotoHome}
      >
        Chat App
      </div>
      <Spacer />
      {user && (
        <React.Fragment>
          <div className="flex justify-center	items-center">
            <Link to="/user" className="cursor-pointer">
              <AuthUserThumb />
            </Link>
          </div>
          <div className="mx-2 flex flex-col">
            <Link
              className="text-base text-white inline-block mb-1 cursor-pointer capitalize"
              to="/user" 
            >
              {user.displayName}
            </Link>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="xs">
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
