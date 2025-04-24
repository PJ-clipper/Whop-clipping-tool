import { VideoUploader } from "@/components/video-uploader"
import { FormatSelector } from "@/components/format-selector"
import { OptionsPanel } from "@/components/options-panel"
import { VideoPreview } from "@/components/video-preview"
import { ProcessingStatus } from "@/components/processing-status"
import { DownloadSection } from "@/components/download-section"
import { BackendTest } from '@/components/BackendTest'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <header className="mb-12 text-center animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Viral Clip Generator
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Transform your videos into engaging short-form content
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="card">
              <VideoUploader />
            </div>
            
            <div className="card">
              <FormatSelector />
            </div>
            
            <div className="card">
              <OptionsPanel />
            </div>
            
            <div className="card">
              <ProcessingStatus />
            </div>
            
            <div className="card">
              <DownloadSection />
            </div>
            
            <div className="card">
              <BackendTest />
            </div>
          </div>
          
          <div className="sticky top-8 h-fit">
            <div className="card">
              <VideoPreview />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
