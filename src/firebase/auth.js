import {app, db} from './db.js'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth'
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
  getDoc,
} from 'firebase/firestore'

export const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export async function getUserData() {
  const user = auth.currentUser
  if (!user) return null
  let returnUser
  const q = query(collection(db, 'users'), where('uid', '==', user.uid))
  const docs = await getDocs(q)
  docs.forEach((doc) => {
    returnUser = doc.data()
  })
  return returnUser
}

export const signInWithGoogle = async () => {
  try {
    let isNew = false
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const docs = await getDocs(q)
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
        profilePicture: user.photoURL,
      })
      isNew = true
    }
    return isNew
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    })
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    alert('Password reset link sent!')
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

export const logout = () => {
  signOut(auth)
}
