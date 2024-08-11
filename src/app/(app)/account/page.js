import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/libs/models/page";
import mongoose from "mongoose";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import cloneDeep from "clone-deep";

export default async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;

  if (!session) {
    redirect("/");
  }

  mongoose.connect(process.env.MONGODB_URI);

  const page = await Page.findOne({ owner: session?.user?.email });

  const leanPage = cloneDeep(page.toJSON());
  leanPage._id = leanPage._id.toString();

  if (page) {
    return (
      <>
        <PageSettingsForm page={leanPage} user={session.user} />
        <PageButtonsForm page={leanPage} user={session.user} />
        <PageLinksForm page={leanPage} user={session.user} />
      </>
    );
  }

  return (
    <>
      <UsernameForm desiredUsername={desiredUsername} />
    </>
  );
}
