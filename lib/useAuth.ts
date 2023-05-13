import { useState, useEffect } from "react";
import { auth, provider } from "@/lib/firebase";

interface User {
	displayName: string | null;
	email: string | null;
	photoURL: string | null;
	uid: string;
}

export default function useAuth() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
			if (firebaseUser) {
				setUser(firebaseUser);
			} else {
				setUser(null);
			}
		});
		return () => unsubscribe();
	}, []);

	const signInWithGoogle = async () => {
		try {
			await auth.signInWithPopup(provider);
		} catch (error) {
			console.error(error);
		}
	};

	const signOut = async () => {
		try {
			await auth.signOut();
		} catch (error) {
			console.error(error);
		}
	};

	return { user, signInWithGoogle, signOut };
}
