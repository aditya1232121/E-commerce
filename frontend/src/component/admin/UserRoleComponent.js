// UserRoleComponent.js
import React from "react";
import { useSelector } from "react-redux";

const UserRoleComponent = () => {
  const { user } = useSelector((state) => state.user); // Access the user object from Redux

  // Check the role of the user
  if (user?.role === "admin") {
    console.log("User is an admin");
  } else {
    console.log("User is not an admin");
  }

  return (
    <div>
      {/* Render different content based on user role */}
      {user?.role === "admin" ? (
        <p>Welcome Admin!</p>
      ) : (
        <p>Welcome User!</p>
      )}
    </div>
  );
};

export default UserRoleComponent;
