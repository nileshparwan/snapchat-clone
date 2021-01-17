import React, { useRef, useCallback } from 'react';
import {useDispatch} from 'react-redux';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { setCameraImage } from './features/cameraSlice';
import { useHistory } from 'react-router-dom';
import './WebcamCapture.css'; 

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",
};

function WebcamCapture() {
    const webCamRef = useRef(null);
    const dispatch = useDispatch(); // allows us to add data to redux
    const history = useHistory();

    const capture = useCallback(() => {
        // use callbasck will run the function once and will same the output
        // when dependancy changes it re renders the function {webcamref}
        const imageSrc = webCamRef?.current.getScreenshot();
        dispatch(setCameraImage(imageSrc)); 
        history.push('/preview'); 
    }, [webCamRef]);

    return (
        <div className="webcamCapture">
            <Webcam
                audio={false}
                height={videoConstraints.height}
                ref={webCamRef}
                screenshotFormat="image/jpeg"
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
            />

            <RadioButtonUncheckedIcon
                className="webcamCapture__button"
                onClick={capture}
                fontSize="large"
            />

        </div>
    );
}

export default WebcamCapture;
