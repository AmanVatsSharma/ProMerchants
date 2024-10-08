import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react'

interface VideoPlayerProps {
    src: string
    poster?: string
    className?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, className = '' }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        const video = videoRef.current
        if (video) {
            video.addEventListener('timeupdate', handleTimeUpdate)
            video.addEventListener('loadedmetadata', handleLoadedMetadata)
        }
        return () => {
            if (video) {
                video.removeEventListener('timeupdate', handleTimeUpdate)
                video.removeEventListener('loadedmetadata', handleLoadedMetadata)
            }
        }
    }, [])

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime)
        }
    }

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration)
        }
    }

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            videoRef.current?.requestFullscreen()
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value)
        if (videoRef.current) {
            videoRef.current.currentTime = time
            setCurrentTime(time)
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    return (
        <div className={`relative ${className}`}>
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-auto"
                onClick={togglePlay}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="flex items-center justify-between text-white">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={togglePlay}
                    >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </motion.button>
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full mx-4"
                    />
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleMute}
                    >
                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleFullscreen}
                    >
                        {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                    </motion.button>
                </div>
                <div className="flex justify-between text-white text-sm mt-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer