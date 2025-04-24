"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"

export function DownloadSection() {
  const [isGenerated, setIsGenerated] = useState(false)

  // This would normally be controlled by the actual processing status
  // For demo purposes, we'll simulate it being available after 5 seconds
  useState(() => {
    const timer = setTimeout(() => {
      setIsGenerated(true)
    }, 5000)

    return () => clearTimeout(timer)
  })

  const handleDownload = () => {
    // This would normally trigger the actual download
    alert("Downloading clip... (This is a placeholder)")
  }

  const handleShare = () => {
    // This would normally open a share dialog
    alert("Sharing clip... (This is a placeholder)")
  }

  if (!isGenerated) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Download</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Generate a clip to enable download options</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Download</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={handleDownload} className="w-full" size="lg">
            <Download className="w-5 h-5 mr-2" />
            Download
          </Button>

          <Button onClick={handleShare} variant="outline" className="w-full" size="lg">
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
        </div>

        <div className="p-3 text-xs bg-gray-100 rounded-lg dark:bg-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">Download options:</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="quality-high"
                name="quality"
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                defaultChecked
              />
              <label htmlFor="quality-high" className="ml-2 text-gray-700 dark:text-gray-300">
                High Quality
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="quality-medium"
                name="quality"
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
              />
              <label htmlFor="quality-medium" className="ml-2 text-gray-700 dark:text-gray-300">
                Medium Quality
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="format-mp4"
                name="format"
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                defaultChecked
              />
              <label htmlFor="format-mp4" className="ml-2 text-gray-700 dark:text-gray-300">
                MP4
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="format-webm"
                name="format"
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
              />
              <label htmlFor="format-webm" className="ml-2 text-gray-700 dark:text-gray-300">
                WebM
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
