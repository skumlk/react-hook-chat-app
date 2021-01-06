import useUser from "hooks/useUser";
import React from "react";
import { useAuth } from "services/auth";
import { RoundThumb } from "styles/style";

function UserThumb({ user_id, size = "small" }) {
  const { user, isLoading } = useUser(user_id);

  return (
    <RoundThumb
      size={size}
      title={user?.name}
      src={
        !isLoading && user.profile_pic ? user.profile_pic : "/img/user/avatar.png"
      }
    />
  );
}

function AuthUserThumb({ size = "small" }) {
  const { user } = useAuth();
  return (
    <RoundThumb
      size={size}
      src={user?.profile_pic ? user.profile_pic : "/img/user/avatar.png"}
    />
  );
}

export { UserThumb, AuthUserThumb };
