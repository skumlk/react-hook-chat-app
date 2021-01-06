import React, { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { useUserApi } from "services/user";
import { useAuth } from "services/auth";
import { AutoCompleteItem, AutoCompleteItemList } from "styles/style";

function UserSearch({ onUserChange }) {
  const { user: AuthUser } = useAuth()
  const [isFocused, setFocused] = useState(false)
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const { getUsersByName } = useUserApi();

  function onUserClick(id) {
    setQuery("");
    onUserChange(id);
  }

  useEffect(() => {
    if (!query) {
      setUsers([]);
      return;
    }
    getUsersByName(query.toLowerCase()).then((result) => {
      const users = [];
      if (!result.empty)
        result.forEach((doc) => { if (doc.id !== AuthUser.uid) users.push({ id: doc.id, ...doc.data() }) });
        console.log(users)
      setUsers(users);
    });
  }, [query, getUsersByName]);

  const isShowMenu = isFocused &&  query
  return (
    <div>
      <Input
        placeholder="Search By Name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
      />
      { isShowMenu && <AutoCompleteItemList>
        {users.length === 0 && query && (
          <AutoCompleteItem>No users for {query}</AutoCompleteItem>
        )}
        {users &&
          users.map((item) => (
            <AutoCompleteItem key={item.id} onClick={() => onUserClick(item.id)} className="capitalize">
              {item.name}
            </AutoCompleteItem>
          ))}
      </AutoCompleteItemList>}
    </div>
  );
}

export default UserSearch;
