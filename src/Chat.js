import React from 'react';
import { useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import ReactTimeago from 'react-timeago';
import './Chat.css';
import { selectImage } from './features/appSlice';
import { useHistory } from 'react-router-dom';
import { db } from './firebase';

const Chat = ({
    id,
    username,
    timestamp,
    imageUrl,
    read,
    profilePic
}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const open = () => {
        if (!read) {
            dispatch(selectImage(imageUrl));
            db
                .collection("posts")
                .doc(id)
                .set(               //can use both set(need to use merge when using set) or update
                    { read: true },
                    { merge: true } //merge updates the db for the selected items else it would completely overwrite the collection
                );
            history.push("/chats/view");
        }
    };

    return (
        <div onClick={open} className="chat">
            <Avatar className="chat__avatar" src={profilePic} />
            <div className="chat__info">
                <h4>{username}</h4>
                <p>{!read && "Tap to view -"}{" "}<ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /></p>
            </div>

            {!read && <StopRoundedIcon className="chat__readIcon" />}
        </div>
    );
};

export default Chat;
