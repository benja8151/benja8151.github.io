import React, { useEffect, useState } from 'react'


// === STATIC IMAGE LIST ===
// Replace these URLs with your own or add more.
const IMAGES = [
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=1600&q=80&auto=format&fit=crop',
]


function shuffle(array) {
    const arr = array.slice()
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}


export default function App() {
    const [dark, setDark] = useState(() => {
        const cached = localStorage.getItem('ipviewer:dark')
        return cached ? JSON.parse(cached) : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    const [currentIndex, setCurrentIndex] = useState(() => {
        const cached = localStorage.getItem('ipviewer:currentIndex')
        return cached ? Number(cached) : Math.floor(Math.random() * IMAGES.length)
    })
    const [seen, setSeen] = useState(() => {
        const cached = localStorage.getItem('ipviewer:seen')
        if (cached) {
            return JSON.parse(cached)
        }
        // Initialize with current index
        const cachedIndex = localStorage.getItem('ipviewer:currentIndex')
        const initialIndex = cachedIndex ? Number(cachedIndex) : Math.floor(Math.random() * IMAGES.length)
        return [initialIndex]
    })
    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark)
        localStorage.setItem('ipviewer:dark', JSON.stringify(dark))
    }, [dark])

    useEffect(() => {
        localStorage.setItem('ipviewer:currentIndex', String(currentIndex))
    }, [currentIndex])

    useEffect(() => {
        localStorage.setItem('ipviewer:seen', JSON.stringify(seen))
    }, [seen])

    // Ensure current index is marked as seen on mount
    useEffect(() => {
        setSeen(prev => prev.includes(currentIndex) ? prev : [...prev, currentIndex])
    }, []) // Only run on mount

    const currentImage = IMAGES[currentIndex]

    function handleNextPattern() {
        setShowAll(false)
        
        // Get all unseen images
        const unseen = IMAGES.map((_, i) => i).filter(idx => !seen.includes(idx))
        
        if (unseen.length === 0) {
            // All images have been seen, reset and pick a random one
            const newIndex = Math.floor(Math.random() * IMAGES.length)
            setCurrentIndex(newIndex)
            setSeen([newIndex])
        } else {
            // Randomly select from unseen images
            const randomUnseenIndex = unseen[Math.floor(Math.random() * unseen.length)]
            setCurrentIndex(randomUnseenIndex)
            setSeen(prev => [...prev, randomUnseenIndex])
        }
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-4">
            {/* Header with controls */}
            <div className="w-full max-w-6xl mb-4 flex justify-between items-center">
                <button
                    onClick={() => setDark(!dark)}
                    className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    {dark ? '☀️ Light' : '🌙 Dark'}
                </button>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    Pattern {currentIndex + 1}
                </div>
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    {showAll ? 'Single View' : 'Show All'}
                </button>
            </div>

            {/* Main content area */}
            {showAll ? (
                <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {IMAGES.map((img, idx) => (
                        <div
                            key={idx}
                            className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${idx === currentIndex
                                    ? 'border-blue-500 dark:border-blue-400'
                                    : 'border-transparent'
                                }`}
                            onClick={() => {
                                setCurrentIndex(idx)
                                setSeen(prev => prev.includes(idx) ? prev : [...prev, idx])
                                setShowAll(false)
                            }}
                        >
                            <img
                                src={img}
                                alt={`Image ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full max-w-6xl">
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800">
                        <img
                            src={currentImage}
                            alt={`Image ${currentIndex + 1}`}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Navigation button */}
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleNextPattern}
                            className="px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors text-lg"
                        >
                            Next Pattern
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}