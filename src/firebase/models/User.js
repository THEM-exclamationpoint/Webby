import {db} from '../db'
import {auth, getUserData} from '../auth'
import {getUsersFriends} from '../friends'
import {getListOfGroups} from '../chat'
import {getInterestsOfUser} from '../graph'
import {zipToCoordinates} from '../location'
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
  setDoc,
  addDoc,
  deleteDoc,
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
    this.uid = user && user.uid ? user.uid : ''
    //profile data
    this.name = user && user.name ? user.name : ''
    this.pronouns = user && user.pronouns ? [...user.pronouns] : [] // array of strings
    this.remote = user && user.remote ? user.remote : false
    this.local = user && user.local ? user.local : false
    this.availability =
      user && user.availability
        ? user.availability
            .map((day) => {
              return {...day}
            })
            .sort((a, b) => a.id - b.id)
        : newAvailability()
    this.location =
      user && user.location ? user.location : {latitude: null, longitude: null}
    this.zipCode = user && user.zipCode ? user.zipCode : ''
    this.country = user && user.country ? user.country : null
    this.profilePicture = user && user.profilePicture ? user.profilePicture : ''
    this.range = user && user.range ? user.range : 20
    this.interests = user && user.interests ? [...user.interests] : []
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

  async toProfile() {
    let geocoded
    if (this.zipCode && !this.location.latitude) {
      geocoded = await zipToCoordinates(this.zipCode, this.country)
    }
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
      location: geocoded ? {...geocoded} : {...this.location},
      zipCode: this.zipCode,
      country: this.country,
      profilePicture: this.profilePicture,
      range: this.range,
    }
  }

  async updateMyProfile() {
    try {
      // update user entry
      let user = auth.currentUser
      if (!user || user.uid !== this.uid) return
      let uq = query(collection(db, 'users'), where('uid', '==', this.uid))
      const udocs = await getDocs(uq)
      let udocId
      udocs.forEach((doc) => {
        udocId = doc.id
      })
      const ref = doc(db, 'users', udocId)
      await updateDoc(ref, await this.toProfile())

      if (this.interests.length) {
        let interestIds = []
        for (let item of this.interests) {
          let iq = query(
            collection(db, 'interests'),
            where('interest', '==', item)
          )
          let data
          let idocs = await getDocs(iq)
          if (!idocs.docs.length) {
            data = {
              interest: item,
              interestId: Date.now() + Math.floor(Math.random() * 10000),
            }
            await addDoc(collection(db, 'interests'), data)
          } else {
            idocs.forEach((idoc) => (data = idoc.data()))
          }
          interestIds.push(data.interestId)
        }

        let jq = query(
          collection(db, 'junction_user_interest'),
          where('uid', '==', this.uid)
        )

        let jdocs = await getDocs(jq)
        if (jdocs) {
          for (let jdoc of jdocs.docs) {
            if (!interestIds.includes(jdoc.data().interestId)) {
              const jref = doc(db, 'junction_user_interest', jdoc.id)
              await deleteDoc(jref)
            } else {
              interestIds = interestIds.filter(
                (item) => item !== jdoc.data().interestId
              )
            }
          }
        }

        for (let id of interestIds) {
          await addDoc(collection(db, 'junction_user_interest'), {
            interestId: id,
            uid: this.uid,
          })
        }
      }
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

  async uploadImage(img) {
    try {
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }
}
