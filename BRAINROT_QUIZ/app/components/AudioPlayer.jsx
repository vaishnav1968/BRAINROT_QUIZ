'use client'

import { useAudio } from 'react-use'

import {
    RxSpeakerOff,
    RxSpeakerQuiet,
    RxSpeakerModerate,
    RxSpeakerLoud,
} from 'react-icons/rx'

import { HiPlay, HiStop } from 'react-icons/hi2'

import { useEffect, useState, useRef } from 'react'

const trackNames = [
    'IDK.mp4',
    'IDK_2.mp4',
    'IDK_3.mp4',
    'IDK_4.mp4',
    'IDK_5.mp4',
    'IDK_6.mp4',
    'IDK_7.mp4',
    'IDK_8.mp4',
]

const AudioPlayer = () => {
    const [audio, state, controls, ref] = useAudio({
        src: '/audio/IDK.mp3',
        autoPlay: true, // very inconsistent. not sure why
    })

    // const playButtonRef = useRef(null)

    const [volumeLevel, setVolumeLevel] = useState(3) // 0 is off, 3 is maximum

    const handleSpeakerClick = (e) => {
        switch ((volumeLevel + 1) % 4) {
            case 0:
                controls.volume(0)
                break
            case 1:
                controls.volume(0.1)
                break
            case 2:
                controls.volume(0.5)
                break
            case 3:
                controls.volume(1)
        }
        setVolumeLevel((prevVolumeLevel) => (prevVolumeLevel + 1) % 4)
    }

    const handleTrackSelect = (e) => {
        let trackName = e.target.value
        trackName = trackName.toLowerCase().replace(' ', '-')
        // console.log(trackName)
        ref.current.src = `/audio/${trackName}.mp3`
        // controls.play()
        // console.log(ref.current)
    }

    const speakerIcon = () => {
        let size = 30

        switch (volumeLevel) {
            case 0:
                return <RxSpeakerOff size={size} />
            case 1:
                return <RxSpeakerQuiet size={size} />
            case 2:
                return <RxSpeakerModerate size={size} />
            case 3:
                return <RxSpeakerLoud size={size} />
        }
    }

    const handlePlayButton = () => {
        if (state.playing) {
            controls.pause()
            controls.seek(0)
        } else {
            controls.play()
        }
    }

    useEffect(() => {
        // console.log(state)
        // console.log(ref.current)
        // controls.play()
        // playButtonRef.current.click()
        ref.current.src = `/audio/IDK.mp3`
    }, [])

    return (
        <div id='audio-player' className='flex items-center gap-1 p-4'>
            {audio}

            <button
                onClick={handlePlayButton}
                // ref={playButtonRef}
                className='px-2 py-1 text-sm text-[#6ee7b7] border border-[#6ee7b7]/50 rounded bg-transparent '
            >
                {state.playing ? <HiStop size={20} /> : <HiPlay size={20} />}
            </button>

            <select
                onChange={handleTrackSelect}
                name='trackName'
                defaultValue='IDK.mp4'
                className='p-0 py-1 pl-2 text-[#6ee7b7] text-sm border border-[#6ee7b7]/50 rounded bg-transparent min-w-[110px] focus:outline-none focus:ring-0  focus:border-[#6ee7b7]'
            >
                {trackNames.map((trackName, index) => (
                    <option
                        value={trackName}
                        className='text-black bg-transparent'
                        key={index}
                    >
                        {trackName}{' '}
                    </option>
                ))}
            </select>

            <button
                onClick={() => handleSpeakerClick()}
                style={{ color: '#6ee7b7' }}
                className='ml-2'
            >
                {speakerIcon()}
            </button>

            
        </div>
    )
}
export default AudioPlayer
