import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import { fmtFromFileReader } from "../utils/helper";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
/* const firebaseConfig = { */
/*   apiKey: 'AIzaSyCbkMeTzrGKTvXsapoozv4w1nFZ3NO4igE', */
/*   authDomain: 'chat-app-99a7d.firebaseapp.com', */
/*   projectId: 'chat-app-99a7d', */
/*   storageBucket: 'chat-app-99a7d.appspot.com', */
/*   messagingSenderId: '546425543691', */
/*   appId: '1:546425543691:web:48cbf17703681b2ae57b0e', */
/* }; */

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const getAvatar = async (id) => {
  const avatar = ref(storage, `avatars/${id}.png`);
  return await getDownloadURL(ref(storage, avatar));
};

export const getCoverPicture = async (id) => {
  const coverPicture = ref(storage, `cover-pictures/${id}.png`);
  return await getDownloadURL(ref(storage, coverPicture));
};

const uploadImg = async (src, path) => {
  const refImg = ref(storage, `${path}`);
  return await uploadString(refImg, fmtFromFileReader(src), "base64", {
    contentType: "image/png",
  });
};

export const uploadAvatar = async (id, src) =>
  await uploadImg(src, `avatars/${id}.png`);

export const uploadCoverPicture = async (id, src) =>
  await uploadImg(src, `cover-pictures/${id}.png`);
