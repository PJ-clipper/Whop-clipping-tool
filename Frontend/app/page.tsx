import { VideoUploader } from "@/components/video-uploader"
import { FormatSelector } from "@/components/format-selector"
import { OptionsPanel } from "@/components/options-panel"
import { VideoPreview } from "@/components/video-preview"
import { ProcessingStatus } from "@/components/processing-status"
import { DownloadSection } from "@/components/download-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Viral Clip Generator</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Transform long videos into viral short-form content
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <VideoUploader />
            <FormatSelector />
            <OptionsPanel />
            <ProcessingStatus />
            <DownloadSection />
          </div>
          <div className="sticky top-8 h-fit">
            <VideoPreview />
          </div>
        </div>
      </div>
    </main>
  )
}
