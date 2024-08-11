"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChartLine,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "@/components/buttons/LogoutButton";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
  const path = usePathname();

  return (
    <nav className="inline-flex mx-auto flex-col text-center mt-8 gap-3 text-gray-800">
      <Link
        href="/account"
        className={
          path === "/account"
            ? "flex gap-4 p-2 text-blue-600 font-bold"
            : "flex gap-4 p-2"
        }
      >
        <FontAwesomeIcon icon={faFileLines} className="h-6 w-6" />
        <span>My Page</span>
      </Link>
      <Link
        href="/analytics"
        className={
          path === "/analytics"
            ? "flex gap-4 p-2 text-blue-600 font-bold"
            : "flex gap-4 p-2"
        }
      >
        <FontAwesomeIcon icon={faChartLine} className="h-6 w-6" />
        <span>Analytics</span>
      </Link>
      <LogoutButton
        iconLeft={true}
        className={"flex gap-4 p-2 items-center"}
        iconClasses={"h-6 w-6"}
      />
      <Link href={"/"} className="flex gap-2 text-gray-500 pt-6 text-xs">
        <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
        <span>Back to website</span>
      </Link>
    </nav>
  );
}
