import { Loader2 } from "lucide-react";

export default function Loading(){


    return (
        <div className="flex h-[700px] items-center justify-center rounded-xl border-2 border-gray-200 bg-linear-to-br from-blue-50 to-purple-50 shadow-xl">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-blue-400 opacity-20" />
            </div>
            <p className="text-base font-semibold text-gray-700">
              در حال بارگذاری داده‌های بازار...
            </p>
            <div className="flex gap-2">
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-purple-500"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-pink-500"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      )
}