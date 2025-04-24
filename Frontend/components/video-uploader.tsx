"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, FileVideo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function VideoUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const videoFile = acceptedFiles[0]
    if (videoFile) {
      setFile(videoFile)
      simulateUpload()
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".webm"],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 500, // 500MB
  })

  const simulateUpload = () => {
    setUploading(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const removeFile = () => {
    setFile(null)
    setProgress(0)
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Upload Video</h2>

      {!file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-gray-300 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Drag and drop your video here, or click to browse
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Supports MP4, MOV, AVI, WEBM (max 500MB)</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-gray-100 rounded-lg dark:bg-gray-700">
            <FileVideo className="flex-shrink-0 w-8 h-8 mr-3 text-gray-500 dark:text-gray-400" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{file.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
            <Button variant="ghost" size="icon" onClick={removeFile} className="flex-shrink-0">
              <X className="w-4 h-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Uploading...</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
