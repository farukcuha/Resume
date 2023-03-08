import React from "react";
import useSound from 'use-sound';
import playIcon from './images/play.png'
import pauseIcon from './images/pause.png'
import Tessa from './tessa.mp3'
import YouBelongToMe from './you_belong_to_me.mp3'
import { useState } from "react";

const MusicPlayer = () => {
    
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentSound, setCurrentSound] = useState(YouBelongToMe)
    
    const [playBoop, { pause }] = useSound(currentSound);

    const togglePlay = () => {
        if (isPlaying) {
            pause();

        } else {
            playBoop();
        }
        setIsPlaying(!isPlaying);

    }

    return (
        <img className="social" style={{
            color: "white"
        }} onClick={togglePlay} src={isPlaying == true ? pauseIcon : playIcon} />
    );
};

export default MusicPlayer;