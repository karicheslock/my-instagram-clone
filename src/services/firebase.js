import { db } from '../lib/firebase';
import { query, getDocs, where, collection } from 'firebase/firestore';

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
