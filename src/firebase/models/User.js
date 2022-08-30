import {db} from '../db'
import {getUsersFriends} from '../friends'
import {getListOfGroups} from '../chat'
import {
  EmailAuthProvider,
  updatePassword,
  updateEmail,
  updateProfile,
  verifyBeforeUpdateEmail,
  reauthenticateWithCredential,
} from 'firebase/auth'
import {query, collection, where, doc, updateDoc} from 'firebase/firestore'

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
    this.pronouns = user.pronouns ? [...user.pronouns] : [] //array of strings
    this.remote = user.remote || false
    this.local = user.local || true
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

    //for update use
    this.oldPassword = ''
    this.newPassword = ''
    this.confirmPassword = ''
    this.newEmail = ''
    this.confirmEmail = ''
  }

  queryMe() {
    return query(collection(db, 'users'), where('uid', '==', this.uid))
  }

  referenceMe() {
    return doc(db, 'users', this.uid)
  }

  async myFriends() {
    return await getUsersFriends(this.uid)
  }

  async myGroups() {
    return await getListOfGroups()
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
    return await updateDoc(this.referenceMe(), this.toFirestore())
  }

  async updateMyPassword() {}

  async updateMyEmail() {}
}
