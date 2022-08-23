// find every person logged in user has ongoing chats with. we have a messages collection where each message is a document containing the to, from, content, and date
// when logged in user selects a specific chat, query for all the messages between that user and loggin in user.
// when a message is sent, add to messages collection in db, this will automatically populate it onto the browser (ideally)

import {app, db} from './db'

import {query, getDocs, collection, where, addDoc} from 'firebase/firestore'

export function getListOfUsers() {}
export function getMessagesWithUser() {}

export function sendNewMessage() {}
