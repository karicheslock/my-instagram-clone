import { db } from '../lib/firebase';
import { query, getDocs, where, collection, limit, updateDoc, arrayRemove, arrayUnion, doc } from 'firebase/firestore';

export async function doesUsernameExist(username) {
    const q = query(collection(db, "users"), where("username", "==", username))
    const result = await getDocs(q);

    return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUserId(userId) {
    const q = query(collection(db, "users"), where("userId", "==", userId))
    const result = await getDocs(q);

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return user;
}


export async function getUserFollowedPhotos(userId, followingUserIds) {
    const q = query(collection(db, 'photos'), where('userId', 'in', followingUserIds));
    const result = await getDocs(q);

    const userFollowedPhotos = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    console.log(userFollowedPhotos);

    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }
            const user = await getUserByUserId(photo.userId);
            const username = user[0].username;
            return { username, ...photo, userLikedPhoto };
            
        })
    )

    return photosWithUserDetails;
}

export async function getSuggestedProfiles(userId) {
    const q = query(collection(db, 'users'), limit(10));
    const result = await getDocs(q);
    const [{ following }] = await getUserByUserId(userId);
    
    return result.docs
        .map((user) => ({ ...user.data(), docId: user.id }))
        .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

export async function updateUserFollowing(docId, profileId, isFollowingProfile) {
    const userRef = doc(db, 'users', docId);
    return updateDoc(userRef, {
        following: isFollowingProfile ? arrayRemove(profileId) : arrayUnion(profileId)
    });
}

export async function updateFollowedUserFollowers(docId, followingUserId, isFollowingProfile) {
    const userRef = doc(db, 'users', docId);
    return updateDoc(userRef, {
        following: isFollowingProfile ? arrayRemove(followingUserId) : arrayUnion(followingUserId)
    });
}
