import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./ChatView.css";
import { selectSelectedImage } from './features/appSlice';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const ChatView = () => {
    const selectedImage = useSelector(selectSelectedImage);
    const history = useHistory();

    const exit = useCallback(() => {
        history.push("/chats");
    }, [history]);

    //useEffect protects us in case there is no image on the state. 
    //exit page if no image found on the state.
    useEffect(() => {
        if (!selectedImage) {
            exit();
        }
    }, [selectedImage, exit]);

    return (
        <div className="chatView">
            <img src={selectedImage || ""} onClick={exit} alt="" />
            {selectedImage && (
                <div className="chatView__timer">
                    <CountdownCircleTimer
                        isPlaying
                        duration={10}
                        strokeWidth={6}
                        size={40}
                        colors={[
                            ['#004777', 0.33],
                            ['#F7B801', 0.33],
                            ['#A30000', 0.33],
                        ]}
                    >
                        {({ remainingTime }) => {
                            if (remainingTime === 0) {
                                exit();
                            }
                            return remainingTime;
                        }}
                    </CountdownCircleTimer>
                </div>
            )}
        </div>
    );
};

export default ChatView;
