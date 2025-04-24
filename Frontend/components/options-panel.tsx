"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Subtitles, Scissors, Sparkles, ZoomIn, Volume2 } from "lucide-react"

export function OptionsPanel() {
  const [options, setOptions] = useState({
    autoCaptions: true,
    removeSilences: true,
    detectBestClips: true,
    dynamicZoom: true,
    backgroundMusic: false,
  })

  const [clipDuration, setClipDuration] = useState([30])

  const toggleOption = (option: keyof typeof options) => {
    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }))
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Options</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Subtitles className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Auto Captions</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Add subtitles using AI transcription</p>
            </div>
          </div>
          <Switch checked={options.autoCaptions} onCheckedChange={() => toggleOption("autoCaptions")} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Scissors className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Remove Silences</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Cut out pauses and silent moments</p>
            </div>
          </div>
          <Switch checked={options.removeSilences} onCheckedChange={() => toggleOption("removeSilences")} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Detect Best Clips</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">AI finds the most engaging moments</p>
            </div>
          </div>
          <Switch checked={options.detectBestClips} onCheckedChange={() => toggleOption("detectBestClips")} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ZoomIn className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Dynamic Zoom</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Add automatic zoom effects</p>
            </div>
          </div>
          <Switch checked={options.dynamicZoom} onCheckedChange={() => toggleOption("dynamicZoom")} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Volume2 className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Background Music</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Add trending background tracks</p>
            </div>
          </div>
          <Switch checked={options.backgroundMusic} onCheckedChange={() => toggleOption("backgroundMusic")} />
        </div>

        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Clip Duration</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{clipDuration[0]} seconds</p>
          </div>
          <Slider value={clipDuration} onValueChange={setClipDuration} max={60} min={15} step={1} />
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>15s</span>
            <span>60s</span>
          </div>
        </div>
      </div>
    </div>
  )
}
