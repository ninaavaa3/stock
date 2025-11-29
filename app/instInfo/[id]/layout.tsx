"use client"

import { useParams } from "next/navigation";

const lists = [
    { name: "ملی صنایع مس ایران (فملی)", id: "35425587644337450" },
    { name: "بانک ملت (وبملت)", id: "778253364357513" },
    { name: "پالایش نفت اصفهان(شپنا)", id: "7745894403636165" },
  ];
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const {id}=useParams()
      const title= lists.find((list:{name:string,id:string})=>list.id==id)?.name
 
   
  return (
    <div className="rounded-xl p-2 my-12  ">
      <div className="rounded-xl h-16 mb-8 bg-gray-200 lg:mx-24 border-2 border-gray-100 flex justify-end p-4 "><p className="font-bold text-md">{title}</p></div>
      <div className="lg:mx-24">{children}</div>
    </div>
  );
}
