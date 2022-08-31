import {db} from '../db'
import {auth, getUserData} from '../auth'
import {getUsersFriends} from '../friends'
import {getListOfGroups} from '../chat'
import {getInterestsOfUser} from '../graph'
import {
  EmailAuthProvider,
  updatePassword,
  updateEmail,
  updateProfile,
  verifyBeforeUpdateEmail,
  reauthenticateWithCredential,
} from 'firebase/auth'
import {
  query,
  collection,
  where,
  doc,
  updateDoc,
  getDocs,
} from 'firebase/firestore'

const DAYSOTW = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export const newAvailability = () => {
  return DAYSOTW.map((day, idx) => {
    return {
      id: idx,
      day,
      am: 'unavailable',
      pm: 'unavailable',
    }
  })
}

export class User {
  constructor(user) {
    //utility
    this.uid = user.uid || ''

    //profile data
    this.name = user.name || ''
    this.pronouns = user.pronouns ? [...user.pronouns] : [] // array of strings
    this.remote = user.remote || false
    this.local = user.local || false
    this.availability = user.availability
      ? user.availability
          .map((day) => {
            return {...day}
          })
          .sort((a, b) => a.id - b.id)
      : newAvailability()
    this.location = user.location || ''
    this.zipCode = user.zipCode || ''
    this.profilePicture = user.profilePicture || ''
    this.range = user.range || 20
    this.interests = user.interests ? [...user.interests] : [] // array of strings
  }

  async myFriends() {
    return await getUsersFriends(this.uid)
  }

  async myGroups() {
    return await getListOfGroups()
  }

  async myInterests() {
    return await getInterestsOfUser(this.uid)
  }

  toFirestore() {
    return {
      uid: this.uid,
      name: this.name,
      pronouns: [...this.pronouns],
      remote: this.remote,
      local: this.local,
      availability: this.availability
        .sort((a, b) => a.id - b.id)
        .map((day) => {
          return {...day}
        }),
      location: this.location,
      zipCode: this.zipCode,
      profilePicture: this.profilePicture,
      range: this.range,
      interests: [...this.interests],
    }
  }

  async updateMyProfile() {
    try {
      let user = auth.currentUser
      // if (!user || user.uid !== this.uid) return
      let q = query(collection(db, 'users'), where('uid', '==', this.uid))
      const docs = await getDocs(q)
      let docId
      docs.forEach((doc) => {
        docId = doc.id
      })
      const ref = doc(db, 'users', docId)
      await updateDoc(ref, this.toFirestore())

      return await getUserData()
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  async updateMyPassword(password) {
    try {
      let user = auth.currentUser
      if (!user || user.uid !== this.uid) return
      return await updatePassword(user, password)
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  async updateMyEmail(email) {
    try {
      let user = auth.currentUser
      if (!user || user.uid !== this.uid) return
      return await updateEmail(user, email)
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }
}
