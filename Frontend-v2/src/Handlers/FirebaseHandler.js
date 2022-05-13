
import { initializeApp } from "firebase/app";
import { getFirebaseCredentials } from "./AuthHandler";

export const initializeFirebase = async () => {
    const firebaseCredentials = await getFirebaseCredentials()
    console.log("firebaseCredentials", firebaseCredentials)
    const app = initializeApp(firebaseCredentials);
    return app;
}