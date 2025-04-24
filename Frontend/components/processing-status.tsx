"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Wand2 } from "lucide-react"

export function ProcessingStatus() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const startProcessing = () => {
    setIsProcessing(true)
    setProgress(0)
    setIsComplete(false)

    // Simulate processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          setIsComplete(true)
          return 100
        }
        return prev + 1
      })
    }, 100)
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Generate Clip</h2>

      {!isProcessing && !isComplete ? (
        <Button onClick={startProcessing} className="w-full" size="lg">
          <Wand2 className="w-5 h-5 mr-2" />
          Generate Viral Clip
        </Button>
      ) : isProcessing ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Processing video...</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="p-3 text-sm bg-gray-100 rounded-lg dark:bg-gray-700">
            <p className="font-medium text-gray-900 dark:text-white">Processing steps:</p>
            <ul className="mt-2 ml-5 space-y-1 text-gray-500 list-disc dark:text-gray-400">
              {progress > 10 && <li>Transcribing audio with AI...</li>}
              {progress > 30 && <li>Detecting silences and pauses...</li>}
              {progress > 50 && <li>Finding engaging moments...</li>}
              {progress > 70 && <li>Applying dynamic zoom effects...</li>}
              {progress > 90 && <li>Generating final clip...</li>}
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center p-3 text-sm text-green-800 bg-green-100 rounded-lg dark:bg-green-900/30 dark:text-green-400">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>Clip generated successfully!</span>
          </div>

          <Button
            onClick={() => {
              setIsComplete(false)
              setProgress(0)
            }}
            variant="outline"
            className="w-full"
          >
            Generate Another Clip
          </Button>
        </div>
      )}
    </div>
  )
}
