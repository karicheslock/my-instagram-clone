import React, { useState, usecontext, useContext} from 'react';
import UserContext from '../../context/user';
import { db } from '../../lib/firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

export default function AddComment({ docId, comments, setComments, commentInput }) {
    const [comment, setComment] = useState('');
    const { user: { displayName }} = useContext(UserContext);
    const userRef = doc(db, "photos", docId);

    const handleSubmitComment = (event) => {
        event.preventDefault();

        setComments([{ displayName, comment}, ...comments]);
        setComment('');

        return updateDoc(userRef, {
            comments: arrayUnion({ displayName, comment })
        })
    }

    return (
        <div className='border-t border-gray-300'>
            <form
                className='flex w-full justify-between pl-0 pr-5'
                onSubmit={(event) =>
                    comment.length >= 3 ? handleSubmitComment(event) : event.preventDefault()
                }
                method="POST"
            >
                <input 
                    aria-label='Add a comment'
                    autoComplete='off'
                    className='text-sm text-gray-700 w-full mr-3 py-5 px-4'
                    type='text'
                    name='add-comment'
                    placeholder='Add a comment...'
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                />
                <button
                    className={`text-sm font-bold text-blue-500 ${!comment && 'opacity-25'}`}
                    type='button'
                    disabled={comment.length < 3}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>
    );
}