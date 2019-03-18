export function logOutUser() {
	return {
		type: "LOGOUT_USER"
	}
}

export function logInUser(user) {
	return {
		type: "LOGIN_USER",
		payload: user
	}
}