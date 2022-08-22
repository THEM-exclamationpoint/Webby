import {createUserWithEmailAndPassword, signOut} from 'firebase/auth'
import {addDoc, collection} from 'firebase/firestore'

import {auth} from './auth.js'
import {db} from './db.js'

const userData = [
  {
    email: 'charlotte14@webby-social.test',
    password: 'securePassword',
    firstName: 'Char14',
    lastName: 'Webb14',
    pronouns: ['she', 'they'],
    interests: ['Climbing', 'Cooking', 'Hiking', 'Dance', 'Crochet'],
    profilePicture: 'https://i.imgur.com/dDvuTRg.png',
    location: {
      latitude: '41.948987699749786',
      longitude: '-87.68881421737198',
    },
  },
]

const seedDatabase = async function () {
  const user = userData[0]
  const {
    email,
    password,
    firstName,
    lastName,
    pronouns,
    interests,
    profilePicture,
    location,
  } = user

  console.log('Current user to be seeded: ', firstName, lastName)

  const res = await createUserWithEmailAndPassword(auth, email, password)
  const uid = res.user.uid
  await addDoc(collection(db, 'users'), {
    authProvider: 'local',
    uid,
    email,
    password,
    firstName,
    lastName,
    pronouns,
    interests,
    profilePicture,
    location,
  })

  signOut(auth)
  return
}

seedDatabase()
