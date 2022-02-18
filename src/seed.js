import { addDoc, collection } from 'firebase/firestore';
import { db } from './lib/firebase';

export function seedDatabase(firebase) {

    const dataCollectionRef = collection(db, "users");
    const photoCollectionRef = collection(db, "photos");

    const users = [
      {
        userId: 'Op8WTimJQlfjHSPp581nBEFvawu1',
        username: 'karl',
        fullName: 'Karl Hadwen',
        emailAddress: 'karlhadwen@gmail.com',
        following: ['2'],
        followers: ['2', '3', '4'],
        dateCreated: Date.now()
      },
      {
        userId: '2',
        username: 'raphael',
        fullName: 'Raffaello Sanzio da Urbino',
        emailAddress: 'raphael@sanzio.com',
        following: [],
        followers: ['Op8WTimJQlfjHSPp581nBEFvawu1'],
        dateCreated: Date.now()
      },
      {
        userId: '3',
        username: 'dali',
        fullName: 'Salvador Dalí',
        emailAddress: 'salvador@dali.com',
        following: [],
        followers: ['Op8WTimJQlfjHSPp581nBEFvawu1'],
        dateCreated: Date.now()
      },
      {
        userId: '4',
        username: 'orwell',
        fullName: 'George Orwell',
        emailAddress: 'george@orwell.com',
        following: [],
        followers: ['Op8WTimJQlfjHSPp581nBEFvawu1'],
        dateCreated: Date.now()
      }
    ];
  
    for (let k = 0; k < users.length; k++) {
      addDoc(dataCollectionRef, users[k]);
    }
    
    for (let i = 1; i <= 5; ++i) {
        addDoc(photoCollectionRef, {
            photoId: i,
            userId: '2',
            imageSrc: `../images/users/raphael/${i}.jpg`,
            caption: 'Saint George and the Dragon',
            likes: [],
            comments: [
                {
                displayName: 'dali',
                comment: 'Love this place, looks like my animal farm!'
                },
                {
                displayName: 'orwell',
                comment: 'Would you mind if I used this picture?'
                }
            ],
            userLatitude: '40.7128°',
            userLongitude: '74.0060°',
            dateCreated: Date.now()
        });
    }
  }
  