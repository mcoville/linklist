"use client";
import { ReactSortable } from "react-sortablejs";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
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
import SubmitButton from "../buttons/SubmitButton";
import { savePageButtons } from "@/actions/pageActions";
import toast from "react-hot-toast";

const allButtons = [
  {
    key: "website",
    label: "Website",
    icon: faGlobe,
    placeholder: "yoursite.com",
  },
  {
    key: "email",
    label: "E-Mail",
    icon: faEnvelope,
    placeholder: "your@email.com",
  },
  {
    key: "mobile",
    label: "Mobile",
    icon: faMobile,
    placeholder: "555-555-5555",
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: faInstagram,
    placeholder: "@username",
  },
  {
    key: "facebook",
    label: "FaceBook",
    icon: faFacebook,
    placeholder: "https://www.facebook.com/profile-name",
  },
  {
    key: "discord",
    label: "Discord",
    icon: faDiscord,
    placeholder: "@username",
  },
  { key: "tiktok", label: "TikTok", icon: faTiktok, placeholder: "@username" },
  {
    key: "youtube",
    label: "YouTube",
    icon: faYoutube,
    placeholder: "@channel",
  },
  { key: "x", label: "X", icon: faXTwitter, placeholder: "@username" },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: faWhatsapp,
    placeholder: "@username",
  },
  {
    key: "github",
    label: "GitHub",
    icon: faGithub,
    placeholder: "https://github.com/profile",
  },
];

export default function PageButtonsForm({ user, page }) {
  const pageSavedButtonKeys = Object.keys(page.buttons);
  const pageSavedButtonsInfo = pageSavedButtonKeys.map((key) =>
    allButtons.find((b) => b.key === key)
  );
  const [actvieButtons, setActiveButtons] = useState(pageSavedButtonsInfo);

  function addButtonToProfile(button) {
    setActiveButtons((prevButtons) => {
      return [...actvieButtons, button];
    });
  }

  async function saveButtons(formData) {
    await savePageButtons(formData);
    toast.success("Settings saved!");
  }

  async function removeButton({ key: keyToRemove }) {
    setActiveButtons((prevButtons) => {
      return prevButtons.filter((b) => b.key !== keyToRemove);
    });
  }

  const availableButtons = allButtons.filter(
    (b1) => !actvieButtons.find((b2) => b1.key === b2.key)
  );

  return (
    <>
      <SectionBox>
        <form action={saveButtons}>
          <h2 className="text-2xl font-bold mb-4">Buttons</h2>
          <ReactSortable
            handle=".handle"
            list={actvieButtons}
            setList={setActiveButtons}
          >
            {actvieButtons.map((b) => (
              <div key={b.key} className="mb-4 flex items-center">
                <div className="w-48 flex h-full p-2 gap-2 items-center text-gray-800">
                  <FontAwesomeIcon
                    icon={faGripLines}
                    className="cursor-grabbing text-gray-400 handle"
                  />
                  <FontAwesomeIcon icon={b.icon} />
                  <span>{b.label}:</span>
                </div>
                <input
                  type="text"
                  name={b.key}
                  defaultValue={page.buttons[b.key]}
                  placeholder={b.placeholder}
                  style={{ marginBottom: "0" }}
                />
                <button
                  onClick={() => removeButton(b)}
                  type="button"
                  className="py-2 px-4 bg-gray-300 cursor-pointer text-red-600"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </ReactSortable>
          <div className="flex flex-wrap gap-2 mt-8 border-y py-8">
            {availableButtons.map((b) => (
              <button
                type="button"
                onClick={() => addButtonToProfile(b)}
                className="flex gap-2 p-2 bg-gray-300 items-center"
                key={b.key}
              >
                <FontAwesomeIcon icon={b.icon} />
                <span className="">{b.label}</span>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            ))}
          </div>
          <div className="max-w-[200px] mx-auto mt-8">
            <SubmitButton>
              <FontAwesomeIcon icon={faSave} />
              <span>Save</span>
            </SubmitButton>
          </div>
        </form>
      </SectionBox>
    </>
  );
}
