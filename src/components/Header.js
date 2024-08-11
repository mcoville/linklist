import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./buttons/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="bg-white border-b py-4">
      <div className="max-w-4xl flex justify-between mx-auto px-6">
        <div className="flex items-center gap-6 px-4">
          <Link href={"/"} className="flex items-center gap-2">
            <FontAwesomeIcon icon={faLink} className="text-blue-500 h-4" />
            <span className="text-blue-700 font-bold">LinkList</span>
          </Link>
          <nav className="flex items-center gap-4 text-slate-500 text-sm">
            <Link href={"/about"}>About</Link>
            <Link href={"/pricing"}>pricing</Link>
            <Link href={"/contact"}>Contact</Link>
          </nav>
        </div>
        <div>
          <nav className="flex items-center gap-4 text-sm text-slate-500">
            {!session ? (
              <>
                <Link href={"/login"}>Sign In</Link>
                <Link href={"/login"}>Create Account</Link>
              </>
            ) : (
              <>
                <Link href={"/account"}>Hello, {session.user.name}</Link>
                <LogoutButton />
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
