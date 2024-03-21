import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    let createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { isValidUser: true, message: "Registration successful" };
  } catch (err) {
    return { isValidUser: false, message: err };
  }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    console.log(await signInWithEmailAndPassword(auth, email, password));
    return true;
  } catch (err) {
    console.log("Invalid Credentials");
    return false;
  }
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//   return updatePassword(auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//   return sendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/queryPage`,
//   });
// };
