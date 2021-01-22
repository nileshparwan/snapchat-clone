import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import './Chats.css';
import { db, auth } from './firebase';
import Chat from './Chat';
import { selectUser } from './features/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';

const Chats = () => {
    const [posts, setPost] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        db
            .collection("posts") //coloum post
            .orderBy("timestamp", "desc") //order by timestamp and in descending order
            .onSnapshot(//whenever something changes inside the DB, go ahead and give me the latest change snapshot
                (snapshot) => setPost( // for every snaphot set the post
                    snapshot
                        .docs
                        .map(
                            (doc) => ({
                                id: doc.id,
                                data: doc.data()
                            })
                        )
                )
            );

    }, []);

    const takeSnap = () => {
        dispatch(resetCameraImage);
        history.push("/");
    };

    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar src={user.profilePic} onClick={() => auth.signOut()} className="chats__avatar" />
                <div className="chats__search">
                    <SearchIcon className="chats__searchIcon"/>
                    <input placeholder="Friends" type="text" />
                </div>
                <ChatBubbleIcon className="chats__chatIcon" />
            </div>

            <div className="chats__posts">
                {
                    posts.map(
                        ({ id, data: { profilePic, username, timestamp, imageUrl, read } }) => (
                            <Chat
                                key={id}
                                id={id}
                                username={username}
                                timestamp={timestamp}
                                imageUrl={imageUrl}
                                read={read}
                                profilePic={profilePic}
                            />
                        )
                    )
                }
            </div>

            <RadioButtonUncheckedIcon
                className="chats__takePicIcon"
                onClick={takeSnap}
                fontSize="large"
            />
        </div>
    );
};

export default Chats;
