import React, { useState, useRef, useEffect } from "react";
import "./background-music.scss";

const BackgroundMusic: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch((error) => {
                    console.log("Autoplay was prevented. Waiting for user interaction.", error);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const toggleMusic = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="background-music-container" onClick={toggleMusic}>
            <audio ref={audioRef} loop>
                <source src="/audio/fifaSong.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div className="music-icon">
                <img
                    src={isPlaying ? "/icons/soundOn.svg" : "/icons/soundMute.svg"}
                    alt="Music Toggle"
                />
            </div>
        </div>
    );
};

export default BackgroundMusic;
