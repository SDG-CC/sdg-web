import SDGCampusClub from "@/components/SDGCampusClub";
import SDGInfo from "@/components/SDGInfo";
import SdgsHomeLoading from "@/components/SdgsHomeLoading";

export default function Home() {
  return (
    <div className="w-full grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="w-full flex flex-col row-start-2 items-center sm:items-start">
        <div className="w-full flex flex-row justify-between px-5 border-b-2 border-emerald-500 py-32 sm:py-10 md:py-22 lg:py-32 divide-x-2 divide-sky-300">
          <SDGCampusClub/>
          <SdgsHomeLoading/>
        </div>
        <div className="flex w-full py-20">
        <SDGInfo/>
        </div>
      </main>
    </div>
  );
}
