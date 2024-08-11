import { Page } from "@/libs/models/page";
import { User } from "@/libs/models/User";
import { Event } from "@/libs/models/Event";
import {
  faLink,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import {
  faEnvelope,
  faGlobe,
  faGripLines,
  faMobile,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faFacebook,
  faInstagram,
  faTiktok,
  faYoutube,
  faXTwitter,
  faWhatsapp,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const buttonsIcons = {
  website: faGlobe,
  email: faEnvelope,
  mobile: faPhone,
  instagram: faInstagram,
  facebook: faFacebook,
  discord: faDiscord,
  tiktok: faTiktok,
  youtube: faYoutube,
  x: faXTwitter,
  whatsapp: faWhatsapp,
  github: faGithub,
};

function buttonLink(key, value) {
  if (key === "mobile") {
    return `tel:${value}`;
  }
  if (key === "email") {
    return `mailto:${value}`;
  }

  return value;
}

export default async function UserPage({ params }) {
  const uri = params.uri;

  mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ uri });
  const user = await User.findOne({ email: page.owner });
  await Event.create({ uri: uri, page: uri, type: "view" });
  return (
    <>
      <div className="bg-gray-200 pb-6 min-h-screen">
        <div
          className="h-36 bg-cover bg-center bg-no-repeat"
          style={
            page.bgType === "color"
              ? { backgroundColor: page.bgColor }
              : { backgroundImage: `url(${page.bgImage})` }
          }
        ></div>
        <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
          <Image
            className="rounded-full w-full h-full"
            src={user.image}
            alt="Profile Picture"
            width={256}
            height={256}
          />
        </div>
        <h2 className="text-2xl text-center font-bold mb-4">
          {page.displayName}
        </h2>
        <h3 className="text-md flex gap-2 justify-center items-center text-gray-700">
          <FontAwesomeIcon className="h-4" icon={faLocationDot} />
          <span>{page.location}</span>
        </h3>
        <div className="max-w-xs mx-auto text-center my-2">
          <p>{page.bio}</p>
        </div>
        {/* Display buttons selected by user */}
        <div className="flex gap-2 justify-center mt-4 pb-4">
          {Object.keys(page.buttons).map((buttonKey) => (
            <Link
              href={buttonLink(buttonKey, page.buttons[buttonKey])}
              target="_blank"
              key={buttonKey}
              className="rounded-full border border-white p-3 flex justify-center items-center bg-white shadow shadow-black/50"
            >
              <FontAwesomeIcon
                icon={buttonsIcons[buttonKey]}
                className="h-6 w-6"
              />
            </Link>
          ))}
        </div>
        <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6 p-4 px-8">
          {page.links.map((link) => (
            <Link
              ping={
                process.env.URL +
                "api/click?url=" +
                btoa(link.url) +
                "&page=" +
                page.uri
              }
              href={link.url}
              key={link.key}
              target="_blank"
              className="bg-white p-2 flex"
            >
              <div className="bg-white aspect-square relative -left-4 overflow-hidden shadow-lg shadow-black/50 w-16 h-16 flex justify-center items-center">
                {link.icon && (
                  <Image src={link.icon} alt={"icon"} width={64} height={64} />
                )}
                {!link.icon && (
                  <FontAwesomeIcon icon={faLink} className="w-8 h-8" />
                )}
              </div>
              <div className="flex items-center justify-center">
                <div>
                  <h3>{link.title}</h3>
                  <p className="text-gray-500 h-6 overflow-hidden">
                    {link.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
