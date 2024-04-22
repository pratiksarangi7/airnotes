import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuysIr0agXvxa3YaNvcLsWZLXs-MG_RYI",
  authDomain: "air-notes-d4c88.firebaseapp.com",
  projectId: "air-notes-d4c88",
  storageBucket: "air-notes-d4c88.appspot.com",
  messagingSenderId: "378095901344",
  appId: "1:378095901344:web:871773b45771460b5907c5",
};

// initially no values, values will be mentioned in the firebasecontext.provider
const firebaseContext = createContext(null);
export const useFirebase = () => useContext(firebaseContext);

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

const signupUserWithEmailPass = (email, password) =>
  createUserWithEmailAndPassword(firebaseAuth, email, password);

const signInUserWithEmailPass = (email, password) =>
  signInWithEmailAndPassword(firebaseAuth, email, password);
const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

const handleUpload = async (file, fileName, uploadedBy, user) => {
  if (file == null || fileName == null || uploadedBy == null) {
    alert("All fields must be filled");
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    alert("file size should not exceed 5MB");
    return;
  }

  const storageRef = ref(storage, `files/${fileName} ${Date.now()}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    alert("uploaded successfully!"),
    (error) => {
      alert(error);
    },
    async () => {
      const url = await getDownloadURL(storageRef);
      const newFileName = `${fileName} ${Date.now()}`;
      try {
        await addDoc(collection(firestore, "uploads"), {
          fileName: newFileName,
          uploadedBy: uploadedBy,
          uploadedAt: serverTimestamp(),
          uid: user.uid,
          downloads: 0,
          downloadUrl: url,
        });

        const userDocRef = doc(firestore, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          // If the document exists, update it
          await setDoc(
            userDocRef,
            {
              files: [...userDocSnap.data().files, newFileName],
              uploadCount: userDocSnap.data().uploadCount + 1,
            },
            { merge: true }
          );
        } else {
          // If the document does not exist, create it
          await setDoc(userDocRef, {
            files: [newFileName],
            uploadCount: 1,
            downloadCount: 0,
            email: user.email,
          });
        }
      } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
      }
    }
  );
};

const getAllUploads = async (lim) => {
  try {
    console.log("get operation starts");

    const uploadsCollectionRef = collection(firestore, "uploads");
    console.log("upCollRef: ", uploadsCollectionRef);
    let q;
    if (!lim) {
      console.log("no lim");
      q = query(uploadsCollectionRef, orderBy("uploadedAt", "desc"));
    } else {
      console.log("lim");
      q = query(uploadsCollectionRef, orderBy("uploadedAt", "desc"), limit(10));
    }
    // console.log("query: ", q);

    const uploadsSnapshot = await getDocs(q);
    console.log("upSnps: ", uploadsSnapshot.docs);

    const uploads = uploadsSnapshot.docs.map((doc) => doc.data());
    console.log("uploads: ", uploads);

    return uploads;
  } catch (error) {
    console.error("Error fetching uploads:", error);
    throw error;
  }
};

const incrementDownloads = async (uploaderuid, userUid) => {
  try {
    if (uploaderuid !== userUid) {
      console.log("incrementing downloads");
      const userDocRef = doc(firestore, "users", uploaderuid);
      const userDocSnap = await getDoc(userDocRef);
      await setDoc(
        userDocRef,
        {
          downloadCount: userDocSnap.data().downloadCount + 1,
        },
        { merge: true }
      );
    }
  } catch (e) {
    throw e;
  }
};

const getLeaderBoard = async () => {
  const usersCollectionRef = collection(firestore, "users");
  const q = query(
    usersCollectionRef,
    orderBy("downloadCount", "desc"),
    limit(10)
  );
  const leaderSnapshots = await getDocs(q);
  console.log(leaderSnapshots);
  const leaders = leaderSnapshots.docs.map((snpSht) => snpSht.data());
  console.log(leaders);
  return leaders;
};

const getUserData = async (user) => {
  try {
    const userDocRef = doc(firestore, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data();
    } else {
      console.error("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const deleteFile = async (fileName) => {};

const logout = async () => {
  try {
    await signOut(firebaseAuth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

function FirebaseProvider(props) {
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  });
  return (
    <firebaseContext.Provider
      value={{
        signInUserWithEmailPass,
        signupUserWithEmailPass,
        signInWithGoogle,
        user,
        handleUpload,
        getAllUploads,
        incrementDownloads,
        getLeaderBoard,
        getUserData,
        logout,
      }}
    >
      {props.children}
    </firebaseContext.Provider>
  );
}

export default FirebaseProvider;

// all functions are wrapped in a Context(firebaseContext) so that all the logic
// for handling firebase stuff are written here, and the ui logic doesn't clash with
// firebase logic(code simplicity)
