import {app, db} from './db'
import {getUserData, auth} from './auth'
import {updateProfile, updatePassword, updateEmail} from 'firebase/auth'
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
  orderBy,
  serverTimestamp,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore'

export async function getUserById(uid) {
  try {
    const q = query(collection(db, 'users'), where('uid', '==', uid))
    const docs = await getDocs(q)
    let user
    docs.forEach((doc) => (user = doc.data()))
    return user
  } catch (e) {
    console.error(e)
  }
}

export async function getAllInterests() {
  try {
    let interests = []
    const docs = await getDocs(collection(db, 'interests'))
    docs.forEach((doc) => interests.push(doc.data()))
    return interests
  } catch (e) {
    console.error(e)
  }
}
