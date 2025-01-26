import { signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import { auth } from "../../utils/firebase";

export const registerUser = async (email: string, password: string, name: string) => {
  const userDetails = await signInWithEmailAndPassword(auth, email, password);
  const user = userDetails.user;
  await updateProfile(user, { displayName: name });
  return user;
};

export const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      console.error(error.message);
    });
};
