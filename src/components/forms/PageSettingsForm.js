"use client";
import { useState } from "react";
import {
  faCloudArrowUp,
  faImage,
  faPalette,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import RadioTogglers from "../formItems/radioTogglers";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { savePageSettings } from "@/actions/pageActions";
import toast from "react-hot-toast";
import SectionBox from "../layout/SectionBox";
import { upload } from "@/libs/upload";

export default function PageSettingsForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [avatar, setAvatar] = useState(user?.image);

  async function saveBaseSettings(formData) {
    const result = await savePageSettings(formData);

    if (result) {
      toast.success("Settings saved!");
    } else {
      toast.error("Failed to save settings.");
    }
  }

  async function handleCoverImageChange(ev) {
    await upload(ev, (link) => setBgImage(link));
  }

  async function handleAvatarImageChange(ev) {
    await upload(ev, (link) => setAvatar(link));
  }

  return (
    <div>
      <SectionBox>
        <form action={saveBaseSettings}>
          <div
            className="py-4 -m-4 flex justify-center items-center bg-cover bg-center bg-no-repeat min-h-[300px]"
            style={
              bgType === "color"
                ? { backgroundColor: bgColor }
                : { backgroundImage: `url(${bgImage})` }
            }
          >
            <div>
              <RadioTogglers
                defaultValue={page.bgType}
                options={[
                  { value: "color", icon: faPalette, label: "Color" },
                  { value: "image", icon: faImage, label: "Image" },
                ]}
                onChange={(val) => setBgType(val)}
              />

              {bgType === "color" && (
                <div className="bg-white shadow text-gray-700 p-2 mt-2">
                  <div className="flex gap-2 justify-center">
                    <span>Background Color:</span>
                    <input
                      type="color"
                      name="bgColor"
                      onChange={(ev) => setBgColor(ev.target.value)}
                      defaultValue={page.bgColor}
                    />
                  </div>
                </div>
              )}

              {bgType === "image" && (
                <div className="flex justify-center cursor-pointer">
                  <label className="bg-white shadow px-4 py-2 mt-2 flex gap-2 items-center text-gray-600 cursor-pointer">
                    <input
                      type="hidden"
                      name="bgImage"
                      value={bgImage}
                      readOnly
                    />
                    <input
                      type="file"
                      onChange={handleCoverImageChange}
                      className="hidden"
                      accept="image/*"
                      //maxSize={1048576} // TODO: Limit file size to 1MB - toast when file is too large
                    />
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                    <span>Change Image</span>
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center -mb-12">
            <div className="relative -top-8 w-[128px] h-[128px]">
              <div className="overflow-hidden h-full rounded-full border-4 border-white shadow-lg shadow-black/50">
                <Image
                  className="w-full h-full object-cover"
                  src={avatar}
                  alt="Profile Picture"
                  width={128}
                  height={128}
                />
              </div>
              <label
                htmlFor="avatarIn"
                className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-full shadow shadow-black/50 aspect-square flex items-center text-gray-800 cursor-pointer"
              >
                <FontAwesomeIcon size={"xl"} icon={faCloudArrowUp} />
              </label>
              <input
                onChange={handleAvatarImageChange}
                id="avatarIn"
                type="file"
                className="hidden"
              />
              <input type="hidden" name="avatar" value={avatar} />
            </div>
          </div>
          <div className="p-0">
            <label className="input-label" htmlFor="nameIn">
              Display Name
            </label>
            <input
              type="text"
              id="nameIn"
              name="displayName"
              defaultValue={page.displayName}
              placeholder="John Doe"
            />
            <label className="input-label" htmlFor="locationIn">
              Location
            </label>
            <input
              type="text"
              id="locationIn"
              name="location"
              defaultValue={page.location}
              placeholder="Somewhere in the world"
            />
            <label className="input-label" htmlFor="bioIn">
              Bio
            </label>
            <textarea
              id="bioIn"
              name="bio"
              defaultValue={page.bio}
              placeholder="Your bio goes here..."
            ></textarea>
            <div className="max-w-[200px] mx-auto">
              <SubmitButton>
                <FontAwesomeIcon icon={faSave} />
                <span>Save</span>
              </SubmitButton>
            </div>
          </div>
        </form>
      </SectionBox>
    </div>
  );
}
