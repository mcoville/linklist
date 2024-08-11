"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import {
  faCloudArrowUp,
  faGripLines,
  faLink,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { upload } from "@/libs/upload";
import Image from "next/image";
import { savePageLinks } from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function PageLinksForm({ page, user }) {
  const [links, setLinks] = useState(page.links || []);

  async function save() {
    await savePageLinks(links);
    toast.success("Links saved!");
  }

  function addNewLink() {
    setLinks((prev) => {
      return [
        ...prev,
        {
          key: Date.now().toString(),
          title: "",
          subtitle: "",
          icon: "",
          url: "",
        },
      ];
    });
  }

  function handleUpload(ev, linkKey) {
    upload(ev, (uploadedImageUrl) => {
      setLinks((prevLinks) => {
        const newLinks = [...prevLinks];
        newLinks.forEach((l) => {
          if (l.key === linkKey) {
            l.icon = uploadedImageUrl;
          }
        });
        return newLinks;
      });
    });
  }

  function handleLinkChange(keyOfLinkToChange, prop, ev) {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[prop] = ev.target.value;
        }
      });
      return [...prev];
    });
  }

  function removeLink(linkKeyToRemove) {
    setLinks((prevLinks) => {
      return [...prevLinks].filter((l) => l.key !== linkKeyToRemove);
    });
    toast.success("Link removed!");
  }

  return (
    <>
      <SectionBox>
        <form action={save}>
          <h2 className="text-2xl font-bold mb-4">Links</h2>
          <button
            onClick={addNewLink}
            type="button"
            className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="bg-blue-500 text-white p-1 rounded-full aspect-square"
            />
            <span>Add New</span>
          </button>
          <div className="">
            <ReactSortable handle={".handle"} list={links} setList={setLinks}>
              {links.map((l) => (
                <div key={l.key} className="mt-8 flex gap-6 items-center">
                  <div className="handle">
                    <FontAwesomeIcon
                      icon={faGripLines}
                      className="cursor-grabbing text-gray-400 mr-2"
                    />
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-300 aspect-square overflow-hidden w-16 h-16 inline-flex justify-center items-center">
                      {l.icon && (
                        <Image
                          className="object-cover w-full h-full"
                          src={l.icon}
                          alt={"icon"}
                          width={64}
                          height={64}
                        />
                      )}
                      {!l.icon && <FontAwesomeIcon size="xl" icon={faLink} />}
                    </div>
                    <div>
                      <input
                        onChange={(ev) => handleUpload(ev, l.key)}
                        id={"icon" + l.key}
                        type="file"
                        className="hidden"
                      />
                      <label
                        htmlFor={"icon" + l.key}
                        className="text-gray-700 border mt-2 p-2 flex items-center gap-1 rounded-md shadow cursor-pointer mb-2"
                      >
                        <FontAwesomeIcon icon={faCloudArrowUp} />
                        <span>Change Icon</span>
                      </label>
                      <button
                        onClick={() => {
                          removeLink(l.key);
                        }}
                        type="button"
                        className="py-2 px-4 cursor-pointer text-red-600"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        <span className="ml-1 text-xs">Remove Link</span>
                      </button>
                    </div>
                  </div>
                  <div className="grow">
                    <label className="input-label">Title:</label>
                    <input
                      value={l.title}
                      onChange={(ev) => handleLinkChange(l.key, "title", ev)}
                      type="text"
                      name="title"
                      placeholder="Link Name"
                    />
                    <label className="input-label">Subtitle:</label>
                    <input
                      value={l.subtitle}
                      onChange={(ev) => handleLinkChange(l.key, "subtitle", ev)}
                      type="text"
                      name="subtitle"
                      placeholder="Link Subtitle (optional)"
                    />
                    <label className="input-label">Link URL:</label>
                    <input
                      value={l.url}
                      onChange={(ev) => handleLinkChange(l.key, "url", ev)}
                      type="text"
                      name="url"
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
              ))}
            </ReactSortable>
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
