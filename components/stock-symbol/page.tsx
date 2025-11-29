"use client";
import Link from "next/link";


const lists = [
  { name: "ملی صنایع مس ایران (فملی)", id: "35425587644337450" },
  { name: "بانک ملت (وبملت)", id: "778253364357513" },
  { name: "پالایش نفت اصفهان(شپنا)", id: "7745894403636165" },
];
export default function Symbols() {


  return (
    <div className="flex justify-evenly">
      {lists.map((list: { name: string; id: string }, index: number) => {
        return (
          <div key={index}>
            <button
           
              className="rounded-lg text-sm cursor-pointer bg-[#006600] hover:bg-[#3d693d] text-amber-50 p-2 border-neutral-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
            <Link href={`instInfo/${list.id}`}>
              {list.name}
                </Link>
            </button>
          </div>
        );
      })}
    </div>
  );
}
