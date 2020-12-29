function loginUser(firebase, email, password) {
  return firebase.auth.signInWithEmailAndPassword(email, password);
}

function registerUser(firebase, email, password) {
  return firebase.auth.createUserWithEmailAndPassword(email, password);
}

export { registerUser, loginUser };
