import React from "react";
import { RoundThumb } from "styles/style";
import useUser from "hooks/useUser";

function User({ user_id, isRight = true }) {
  const { user, isLoading } = useUser(user_id);

  return (
    <React.Fragment>
      {!isLoading && (
        <div className={isRight ? "flex items-end" : "flex"}>
          <RoundThumb
            src={user.profile_pic ? user.profile_pic : "/img/user/avatar.png"}
            className="mr-2 items-end"
          />
          <div className="font-bold">{user.name}</div>
        </div>
      )}
    </React.Fragment>
  );
}

export default User;
