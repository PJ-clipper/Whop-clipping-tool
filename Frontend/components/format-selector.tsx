"use client"

import { useState } from "react"
import { Check } from "lucide-react"

type FormatOption = {
  id: string
  name: string
  aspect: string
  icon: string
}

const formats: FormatOption[] = [
  {
    id: "tiktok",
    name: "TikTok",
    aspect: "9:16",
    icon: "tiktok",
  },
  {
    id: "youtube",
    name: "YouTube Shorts",
    aspect: "9:16",
    icon: "youtube",
  },
  {
    id: "instagram",
    name: "Instagram Reels",
    aspect: "9:16",
    icon: "instagram",
  },
]

export function FormatSelector() {
  const [selectedFormat, setSelectedFormat] = useState<string>("tiktok")

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Output Format</h2>

      <div className="grid grid-cols-3 gap-3">
        {formats.map((format) => (
          <button
            key={format.id}
            onClick={() => setSelectedFormat(format.id)}
            className={`relative flex flex-col items-center p-4 border rounded-lg transition-all ${
              selectedFormat === format.id
                ? "border-primary bg-primary/5"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            {selectedFormat === format.id && (
              <div className="absolute top-2 right-2">
                <Check className="w-4 h-4 text-primary" />
              </div>
            )}

            <div className="flex items-center justify-center w-10 h-10 mb-2 text-lg font-bold text-white bg-gray-800 rounded-full dark:bg-gray-700">
              {format.icon.charAt(0).toUpperCase()}
            </div>

            <span className="text-sm font-medium text-gray-900 dark:text-white">{format.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{format.aspect}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
