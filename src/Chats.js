import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import './Chats.css';
import { db } from './firebase';
import Chat from './Chat';

const Chats = () => {
    const [posts, setPost] = useState([]);
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
    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar className="chats__avatar" />
                <div className="chats__search">
                    <SearchIcon />
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
        </div>
    );
};

export default Chats;
