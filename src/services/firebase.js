import { db } from '../lib/firebase';
import { query, getDocs, where, collection } from 'firebase/firestore';

export async function doesUsernameExist(username) {
    const q = query(collection(db, "users"), where("username", "==", username))
    const result = await getDocs(q);

    return result.docs.map((user) => user.data().length > 0);
}