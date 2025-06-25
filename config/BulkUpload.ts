import { slots } from "@/store/resturants"; // Assuming this path and file is correct
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const restaurantData = slots

const uploadData = async () => {
    try {
        for (let i = 0; i < restaurantData.length; i++) {
            const restaurant = restaurantData[i];
            const docRef = doc(collection(db, "slots"), `slot_${i + 1}`);
            await setDoc(docRef, restaurant);
        }
        console.log("Data sent.");
    } catch (e) {
        console.error("Error uploading data:", e);
    }
};

export default uploadData;
