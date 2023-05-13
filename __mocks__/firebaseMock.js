// __mocks__/firebase.ts

const mockSignInWithGoogle = jest.fn();
const mockSignOut = jest.fn();
const mockOnAuthStateChanged = jest.fn();

const auth = () => ({
	signInWithGoogle: mockSignInWithGoogle,
	signOut: mockSignOut,
	onAuthStateChanged: mockOnAuthStateChanged,
});

export default auth;
