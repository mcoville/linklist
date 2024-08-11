import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import SectionBox from "@/components/layout/SectionBox";
import { Event } from "@/libs/models/Event";
import { Page } from "@/libs/models/page";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatISO9075, isToday } from "date-fns";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }
  const page = await Page.findOne({ owner: session.user.email });

  const groupedViews = await Event.aggregate([
    {
      $match: {
        type: "view",
        uri: page.uri,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },
        count: {
          $count: {},
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const clicks = await Event.find({ type: "click", page: page.uri });

  return (
    <div>
      <SectionBox>
        <h2 className="text-xl font-bold mb-6 text-center">Views</h2>
        <Chart
          data={groupedViews.map((o) => ({
            date: o._id,
            views: o.count,
          }))}
        />
      </SectionBox>
      <SectionBox>
        <h2 className="text-xl font-bold mb-6 text-center">Clicks</h2>
        {page.links.map((link) => (
          <div
            key={link._id}
            className="md:flex gap-4 border-t border-gray-200 py-6"
          >
            <div className="text-blue-500 pl-4">
              <FontAwesomeIcon icon={faLink} />
            </div>
            <div className="grow">
              <h3>{link.title || "No Title"}</h3>
              <p className="text-gray-500 text-sm">
                {link.subtitle || "No Subtitle"}
              </p>
              <a
                href={link.url}
                target="_blank"
                className="text-xs text-blue-400"
              >
                {link.url}
              </a>
            </div>
            <div className="text-center border rounded-md p-2 mt-2 md:mt-0 md:shadow-lg">
              <div className="text-3xl text-blue-500 mb-1">
                {
                  clicks.filter(
                    (c) => c.uri === link.url && isToday(c.createdAt)
                  ).length
                }
              </div>
              <div className="text-gray-400 text-xs uppercase font-bold">
                Clicks Today
              </div>
            </div>
            <div className="text-center border rounded-md p-2 mt-2 md:mt-0 md:shadow-lg">
              <div className="text-3xl text-blue-500 mb-1">
                {clicks.filter((c) => c.uri === link.url).length}
              </div>
              <div className="text-gray-400 text-xs uppercase font-bold">
                Clicks Total
              </div>
            </div>
          </div>
        ))}
      </SectionBox>
    </div>
  );
}
