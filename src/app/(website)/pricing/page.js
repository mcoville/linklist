import SectionBox from "@/components/layout/SectionBox";
import Pricing from "./PricingPlans";

export default function PricingPage() {
  return (
    <>
      <SectionBox>
        <h1 className="text-3xl font-bold pl-4">Pricing</h1>
        <Pricing />
      </SectionBox>
    </>
  );
}
