import {createUserWithEmailAndPassword, signOut} from 'firebase/auth'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import {auth} from './auth.js'
import {db} from './db.js'
import {faker} from '@faker-js/faker'

function randomPronouns() {
  //40% of the user base uses he/they or she/they
  //20% uses she/they
  //20% uses he/they

  //30% of the user base uses only he or she pronouns
  //15% use she
  //15% use he

  //20% of the user base uses they

  //8% of the user base uses neopronouns

  //2% of the user base uses any pronouns

  let randomNumber = Math.random()
  let pronouns = []

  if (randomNumber <= 0.2) {
    pronouns.push('she', 'they')
  } else if (randomNumber <= 0.4) {
    pronouns.push('he', 'they')
  } else if (randomNumber <= 0.55) {
    pronouns.push('she')
  } else if (randomNumber <= 0.7) {
    pronouns.push('he')
  } else if (randomNumber <= 0.9) {
    pronouns.push('they')
  } else if (randomNumber <= 0.97) {
    pronouns.push('xe')
  } else if (randomNumber <= 0.98) {
    pronouns.push('fae')
  } else if (randomNumber <= 0.99) {
    pronouns.push('ve')
  } else {
    pronouns.push('any')
  }

  return pronouns
}

const allInterests = [
  '3D printing',
  'Acroyoga',
  'Art',
  'Astrology',
  'Astronomy',
  'Baking',
  'Bartending',
  'Beatboxing',
  'Beer tasting',
  'Blogging',
  'Bonsai',
  'Board games',
  'Book clubs',
  'Bowling',
  'Breadmaking',
  'Building',
  'Calligraphy',
  'Candle making',
  'Candy making',
  'Car building',
  'Card games',
  'Cardistry',
  'Ceramics',
  'Chess',
  'Clothesmaking',
  'Coffee roasting',
  'Computer programming',
  'Cooking',
  'Cosplaying',
  'Crafting',
  'Creative writing',
  'Crocheting',
  'Cross-stitch',
  'Dance',
  'Decorating',
  'Digital arts',
  'Diving',
  'DJing',
  'Drawing',
  'Embroidery',
  'Engraving',
  'Escape rooms',
  'Fashion design',
  'Filmmaking',
  'Fire breathing',
  'Fire spinning',
  'Fire manipulation',
  'Flow arts',
  'Flower arranging',
  'Furniture building',
  'Gaming',
  'Glassblowing',
  'Gardening',
  'Graphic design',
  'Houseplants',
  'Hula hooping',
  'Hydroponics',
  'Ice skating',
  'Improv',
  'Jewelry making',
  'Jigsaw puzzles',
  'Journaling',
  'Judo',
  'Juggling',
  'Karaoke',
  'Karate',
  'Kendama',
  'Knife making',
  'Knitting',
  'Lapidary',
  'Leather crafting',
  'Machining',
  'Macrame',
  'Makeup',
  'Meditation',
  'Metalworking',
  'Model building',
  'Modeling',
  'Modular synthesizers',
  'Music',
  'Needlepoint',
  'Origami',
  'Painting',
  'Performance art',
  'Photography',
  'Pilates',
  'Playing musical instruments',
  'Poetry',
  'Poi',
  'Pole dancing',
  'Puzzles',
  'Pyrotechnics',
  'Quilting',
  'Rapping',
  'Recipe creation',
  'Refinishing',
  'Reiki',
  'Rock climbing',
  'Scrapbooking',
  'Scuba Diving',
  'Sculpting',
  'Shibari',
  'Sewing',
  'Singing',
  'Skating',
  'Sketching',
  'Soapmaking',
  'Storytelling',
  'Sudoku',
  'Taekwondo',
  'Tarot',
  'Tattooing',
  'Thrifting',
  'Upcycling',
  'Video gaming',
  'VR Gaming',
  'Weaving',
  'Weight training',
  'Welding',
  'Wine tasting',
  'Winemaking',
  'Witchcraft',
  'Woodworking',
  'Writing',
  'Writing music',
  'Yo-yo',
  'Yoga',
  'Zumba',
]

const interestExists = async function (interest) {
  try {
    const q = query(
      collection(db, 'interests'),
      where('interest', '==', interest)
    )
    const querySnapshot = await getDocs(q)

    //TODO: Figure out why signOut() is required here. Without it, the process never ends.
    signOut(auth)

    let docs = []

    querySnapshot.forEach((doc) => {
      docs.push(doc.data())
    })

    if (docs[0]) return true
    else return false
  } catch (e) {
    console.error(e)
  }
}

const seedInterests = async function () {
  for (let i in allInterests) {
    let interest = allInterests[i]
    try {
      //Don't duplicate seed documents:
      //if (interestExists(interest)) continue

      await addDoc(collection(db, 'interests'), {
        interest,
        interestId: i,
      })
    } catch (e) {
      console.error('error seeding: ', interest)
    }
  }
}

const seedUsers = async function (usersToSeed = 1) {
  for (let i = 0; i < usersToSeed; i++) {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.name.firstName()
    const pronouns = randomPronouns()
    const profilePicture = 'https://i.imgur.com/dDvuTRg.png'
    const zipCode = faker.address.zipCode()
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const uid = res.user.uid
    await addDoc(collection(db, 'users'), {
      authProvider: 'local',
      uid,
      email,
      password,
      name,
      pronouns,
      profilePicture,
      zipCode,
    })

    seedUserInterestJunctions(res.user.uid)

    signOut(auth)
  }
  return
}

const randomInterestIds = function (numberOfInterests = 5) {
  let userInterests = []

  while (userInterests.length < numberOfInterests) {
    let randomIndex = Math.floor(Math.random() * allInterests.length)

    let randomInterest = allInterests[randomIndex]

    if (!userInterests.includes(randomInterest))
      userInterests.push(String(randomIndex))
  }
  return userInterests
}

const seedUserInterestJunctions = function (uid, numberOfInterests = 5) {
  const interestIds = randomInterestIds(numberOfInterests)

  Promise.all(
    interestIds.map(async (interestId) => {
      await addDoc(collection(db, 'junction_user_interest'), {
        uid,
        interestId,
      })
    })
  )
}

const seedDatabase = async function () {
  await seedInterests()
  seedUsers(150)
}

seedDatabase()
