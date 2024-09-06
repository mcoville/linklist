import SectionBox from "@/components/layout/SectionBox";

export default function AboutUs() {
  return (
    <>
      <SectionBox>
        <h1 className="text-3xl font-bold pl-4">About Us</h1>
        <p className="mt-4 p-2 indent-4">
          LinkList was created from a shared passion for creating user freindly
          application with the latest technologies. Demonstrating the power of
          React, Next.js, Tailwind CSS, and MongoDB.
        </p>
        <p className="p-2 indent-4">
          This project shows how to incorporate Authentication.
        </p>
      </SectionBox>
    </>
  );
}
