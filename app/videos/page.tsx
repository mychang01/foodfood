'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Video {
  id: string
  title: string
  thumbnail: string
  url: string
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Reducing food loss and waste is critical to achieving a sustainable world',
    thumbnail: 'http://img.youtube.com/vi/H_YjtkKTgu0/sddefault.jpg',
    url: 'https://www.youtube.com/watch?v=H_YjtkKTgu0'
  },
  {
    id: '2',
    title: 'Food Waste: The Hidden Cost of the Food We Throw Out I ClimateScience #9',
    thumbnail: 'http://img.youtube.com/vi/ishA6kry8nc/sddefault.jpg',
    url: 'https://www.youtube.com/watch?v=ishA6kry8nc&t=19s'
  },
  {
    id: '3',
    title: 'Food Waste Explained',
    thumbnail: 'http://img.youtube.com/vi/wgLuXvtaLyQ/sddefault.jpg',
    url: 'https://www.youtube.com/watch?v=wgLuXvtaLyQ'
  },
  {
    id: '4',
    title: 'Food waste is a global problem. Here are major drivers and what can be done about it',
    thumbnail: 'http://img.youtube.com/vi/UeFBB0MafT8/sddefault.jpg',
    url: 'https://www.youtube.com/watch?v=UeFBB0MafT8'
  },
  {
    id: '5',
    title: 'Food Waste causes Climate Change. Heres how we stop it.',
    thumbnail: 'http://img.youtube.com/vi/1MpfEeSem_4/sddefault.jpg',
    url: 'https://www.youtube.com/watch?v=1MpfEeSem_4'
  },
  {
    id: '6',
    title: 'Food Waste for Kids | Food Waste in the United States',
    thumbnail: 'http://img.youtube.com/vi/BqWFAq58O-g/sddefault.jpg',
    url: 'https://www.youtube.com/watch?v=BqWFAq58O-g'
  },
  {
    id: '7',
    title: 'Food Waste | The Lexicon of Sustainability',
    thumbnail: 'http://img.youtube.com/vi/qvZaykz58TU/sddefault.jpg',
    url: 'https://www.youtube.com/watch?v=qvZaykz58TU'
  },
  {
    id: '8',
    title: 'Food waste recycling - creating a circular economy',
    thumbnail: 'http://img.youtube.com/vi/2I8Tjb4Fy-Q/sddefault.jpg',
    url: 'https://www.youtube.com/watch?v=2I8Tjb4Fy-Q'
  },
  {
    id: '9',
    title: 'Food Waste, Global Hunger & You',
    thumbnail: 'http://img.youtube.com/vi/TVP3j7_W7og/sddefault.jpg',
    url: 'https://www.youtube.com/watch?v=TVP3j7_W7og'
  },
  // Add more videos as needed
]

const VideoCard = ({ video }: { video: Video }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoId = video.url.split('v=')[1]

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {isPlaying ? (
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full"
          />
        </div>
      ) : (
        <div 
          className="relative aspect-video cursor-pointer group"
          onClick={() => setIsPlaying(true)}
        >
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors">
              <svg 
                className="w-8 h-8 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
      </div>
    </div>
  )
}

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-green-800 mb-8">
          Educational Videos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  )
}

