import { DispenserTabs } from "@/components/dispenser-tabs";

export default function Home() {
  return (
    <div className=" sm:p-20 font-[family-name:var(--font-geist-sans)] w-full">
      <main className="flex flex-col gap-8 items-center sm:items-start w-full">
        <DispenserTabs />
      </main>
    </div>
  );
}
