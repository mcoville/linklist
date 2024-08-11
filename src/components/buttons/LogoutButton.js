"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";

export default function LogoutButton({
  className = "flex gap-2 items-center border p-2 px-4 shadow rounded-md",
  iconLeft = false,
  iconClasses = "",
}) {
  return (
    <button className={className} onClick={() => signOut()}>
      {iconLeft && (
        <FontAwesomeIcon icon={faRightFromBracket} className={iconClasses} />
      )}
      <span>Logout</span>
      {!iconLeft && (
        <FontAwesomeIcon icon={faRightFromBracket} className={iconClasses} />
      )}
    </button>
  );
}
