"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export function VideoPreview() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState([50])
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showCaptions, setShowCaptions] = useState(true)

  // Sample captions for demo
  const captions = [
    { start: 1, end: 3, text: "This is an example" },
    { start: 4, end: 6, text: "of auto-generated captions" },
    { start: 7, end: 10, text: "for your viral clips!" },
  ]

  const [currentCaption, setCurrentCaption] = useState("")

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => {
      setCurrentTime(video.currentTime)
      setProgress((video.currentTime / video.duration) * 100)

      // Update captions based on current time
      if (showCaptions) {
        const activeCaption = captions.find((cap) => video.currentTime >= cap.start && video.currentTime <= cap.end)
        setCurrentCaption(activeCaption ? activeCaption.text : "")
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("ended", handleEnded)
    }
  }, [showCaptions])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newTime = (value[0] / 100) * duration
    video.currentTime = newTime
    setProgress(value[0])
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    video.volume = value[0] / 100
    setVolume(value)
    setIsMuted(value[0] === 0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div className="overflow-hidden bg-black rounded-lg shadow-lg aspect-[9/16] relative">
      <video
        ref={videoRef}
        className="object-cover w-full h-full"
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
        playsInline
        loop
      />

      {/* Captions */}
      {showCaptions && currentCaption && (
        <div className="absolute bottom-20 left-0 right-0 text-center px-4">
          <div className="inline-block px-3 py-1 text-white bg-black/70 rounded-lg text-lg font-medium">
            {currentCaption}
          </div>
        </div>
      )}

      {/* Controls overlay */}
      <div className="absolute inset-0 transition-opacity opacity-0 hover:opacity-100 bg-gradient-to-b from-black/50 via-transparent to-black/50">
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          <div className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded">PREVIEW</div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="mb-2">
            <Slider
              value={[progress]}
              onValueChange={(value) => handleProgressChange(value)}
              max={100}
              step={0.1}
              className="h-1.5"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="text-white hover:bg-white/20 hover:text-white"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>

              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20 hover:text-white"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>

                <div className="w-20">
                  <Slider value={volume} onValueChange={handleVolumeChange} max={100} className="h-1.5" />
                </div>
              </div>
            </div>

            <div className="text-xs font-medium text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
