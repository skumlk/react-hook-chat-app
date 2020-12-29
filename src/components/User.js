import { useUser } from "context/firebase/user-context";
import React from "react";
import { isError, useQuery } from "react-query";
import { UserThumb } from "styles/style";

function User({ user_id }) {
  const { getUserById } = useUser();
  const { status, data: user, isLoading, error } = useQuery(
    ["user", user_id],
    () => getUserById(user_id),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  return (
    <React.Fragment>
      {!isLoading && (
        <div className="flex">
          <UserThumb
            src={user.profile_pic ? user.profile_pic : "/img/user/avatar.png"}
            className="mr-2"
          />
          <div className="font-bold">{user.name}</div>
        </div>
      )}
    </React.Fragment>
  );
}

export default User;
