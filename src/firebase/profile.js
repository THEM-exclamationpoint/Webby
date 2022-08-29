import {app, db} from './db'
import {updateProfile, updatePassword, updateEmail} from 'firebase/auth'
import {
  query,
  getDoc,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
} from 'firebase/firestore'

export async function updateUserData(user) {
  const q = query(collection(db, 'users'), where('uid', '==', 'user.uid'))
}
