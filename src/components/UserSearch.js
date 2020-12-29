import React, { useState, useEffect } from "react";
import { Input, OrderedList, ListItem } from "@chakra-ui/react";
import { useUser } from "context/firebase/user-context";

function UserSearch({ onUserChange }) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const { getUsersByName } = useUser();

  function onUserClick(id) {
    setQuery("");
    onUserChange(id);
  }

  useEffect(() => {
    if (!query) {
      setUsers([]);
      return;
    }
    getUsersByName(query).then((result) => {
      const users = [];
      if (!result.empty)
        result.forEach((doc) => users.push({ id: doc.id, ...doc.data() }));
      setUsers(users);
    });
  }, [query, getUsersByName]);

  return (
    <div>
      <Input
        placeholder="Search By Name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <OrderedList>
        {users.length === 0 && query && (
          <ListItem>No users for {query}</ListItem>
        )}
        {users &&
          users.map((item) => (
            <ListItem key={item.id} onClick={() => onUserClick(item.id)}>
              {item.name}
            </ListItem>
          ))}
      </OrderedList>
    </div>
  );
}

export default UserSearch;
