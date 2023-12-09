// export const selectContacts = state => state.contacts;

// export const selectFilter = state => state.filter;

// export const selectIsLoading = state => state.isLoading;

// export const selectError = state => state.error;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectUser = state => state.auth.user;

export const selectIsRefreshing = state => state.auth.isRefreshing;
