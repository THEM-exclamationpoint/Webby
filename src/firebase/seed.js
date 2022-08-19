import {createUserWithEmailAndPassword} from 'firebase/auth'
import {addDoc, collection} from 'firebase/firestore'

import {auth} from './auth.js'
import {db} from './db.js'

const userData = [
  {
    email: 'charlotte13@webby-social.test',
    password: 'securePassword',
    firstName: 'Char13',
    lastName: 'Webb13',
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
  return
}

seedDatabase()

// const seeding = function () {
//   // initialize index to 0 to access each user data in the seedData array
//   let index = 0
//   // save the interval ID returned from the setInterval method to stop the interval later
//   const interval = setInterval(async () => {
//     const user = newSeedData[index]
//     // destructure the properties on the user object
//     const {
//       email,
//       password,
//       firstName,
//       lastName,
//       pronouns,
//       interests,
//       profilePicture,
//       likes,
//     } = user
//     console.log(
//       'Current user in the setInterval: ',
//       user.firstName,
//       user.lastName
//     )
//     await firebase
//       .auth()
//       // create a new user account associated with the specified email and password
//       .createUserWithEmailAndPassword(email, password)
//       .then(async (response) => {
//         console.log('Created user in Authentication')
//         // store the uid from the UserCredential returned from .createUserWithEmailAndPassword method
//         const uid = response.user.uid
//         // create the data object with the same uid as above
//         const data = {
//           id: uid,
//           email,
//           firstName,
//           lastName,
//           pronouns,
//           interests,
//           profilePicture,
//           likes,
//         }
//         // create a user document reference in the users collection using uid as identifier
//         const usersRef = firebase.firestore().collection('users').doc(uid)
//         // set the user document data using the data object above
//         await usersRef.set(data)
//         console.log('Adding user to the users collection: ', data.email)
//       })
//       .catch((error) => console.log(error))
//     await firebase
//       .auth()
//       // sign out the current user (newly created)
//       .signOut()
//       .then(() => console.log('Sign out successful!'))
//       .catch((error) => console.log(error))
//     // increment index to access the different user data
//     index += 1
//     // when we reach the end of the seedData array, remove the setInterval method
//     if (index === newSeedData.length) clearInterval(interval)
//   }, 2000)
// }
