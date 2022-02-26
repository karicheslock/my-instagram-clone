import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { getUserByUserId, getUserFollowedPhotos } from "../services/firebase";

export default function useFollowedUsersPhotos() {
    const [photos, setPhotos] = useState(null);
    const { user: { uid: userId = ''}} = useContext(UserContext);

    useEffect(() => {
        async function getTimelinePhotos() {
            const followingUserIds = await getUserByUserId(userId);
            let followedUserPhotos = [];

            if (followingUserIds && followingUserIds[0].following.length > 0) {
                followedUserPhotos = await getUserFollowedPhotos(userId, followingUserIds[0].following);

                followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
                setPhotos(followedUserPhotos);
            }
        }

        getTimelinePhotos();
    }, [userId])

    return { photos };
}