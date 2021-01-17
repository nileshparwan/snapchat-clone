import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import NoteIcon from '@material-ui/icons/Note';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SendIcon from '@material-ui/icons/Send';

import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import './Preview.css';

function Preview() {
    const cameraImage = useSelector(selectCameraImage);   // allows us to fetch data from redux
    const history = useHistory();
    const dispath = useDispatch();

    useEffect(() => {
        if (!cameraImage) {
            history.replace('/');
        }
    }, [cameraImage, history]);

    const ClosePreview = () => {
        dispath(resetCameraImage);
        history.replace('/');
    };

    const sendPost = () => {
        
    };

    return (
        <div className="preview">
            <CloseIcon className="preview__close" onClick={ClosePreview} />
            <div className="preview__toolbar--right">
                <NoteIcon />
                <CropIcon />
                <TimerIcon />
                <CreateIcon />
                <TextFieldsIcon />
                <AttachFileIcon />
                <MusicNoteIcon />
            </div>
            <img src={cameraImage} alt="image" />
            <div onClick={sendPost} className="preview__footer">
                <h2>Send Now</h2>
                <SendIcon fontSize="small" className="preview__sendIcon" />
            </div>
        </div>
    );
}

export default Preview; 
