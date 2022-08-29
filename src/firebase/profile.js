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

export async function updateUserData() {
  const user = await getUserData()
  const q = query(collection(db, 'users'), where('uid', '==', user.uid))
}
