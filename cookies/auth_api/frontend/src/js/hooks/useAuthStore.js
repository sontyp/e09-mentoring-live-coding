import { create } from "zustand";

/* 
    Custom hook for providing a global authentication store created with zustand.js
*/
const useAuthStore = create(set => ({
    // Storage for user object
    user: null,

    // Method for testing whether is client is authenticated
    isAuthenticated: function () {
        return this.user !== null;

        // let resp = await axios.get('/auth/validate-token', {withCredentials: true});
    },

    // Method for storing the user object and the token.
    authenticate: (user) => {
        // Store the token in the localStorage if not stored as a httpOnly cookie
        localStorage.setItem('token', user.token);

        // Save the user object to the store
        set({ user: user }); // set new user
    },

    // Method for fetching the stored token from the localStorage
    getToken: () => localStorage.getItem('token'),

    // Method for logging out (remove user object and token)
    logout: () => {
        // Remove token from localStorage
        localStorage.removeItem('token');

        // Remove user object from store
        set({ user: null });
    }
}));

export default useAuthStore;