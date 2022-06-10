
import { initializeApp } from "firebase/app";
import { getFirebaseCredentials } from "./AuthHandler";

export const initializeFirebase = async () => {
    const firebaseCredentials = await getFirebaseCredentials()
    const app = initializeApp(firebaseCredentials);
    return app;
}