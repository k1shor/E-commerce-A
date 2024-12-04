const URL = `http://localhost:5000`

export const register = (user) => {
    console.log(user)
    return fetch(`${URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}