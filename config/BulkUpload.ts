import { restaurants } from "@/store/resturants"; // Assuming this path and file is correct
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const uploadData = async () => {
    try {
        for (let i = 0; i < restaurants.length; i++) {
            const restaurant = restaurants[i];
            const docRef = doc(collection(db, "restaurants"), `restaurant_${i + 1}`);
            await setDoc(docRef, restaurant);
        }
        console.log("Data sent.");
    } catch (e) {
        console.error("Error uploading data:", e);
    }
};

export default uploadData;
