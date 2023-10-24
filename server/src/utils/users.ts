// Could use a database for this stuff as well

type UserType = {
    id: string,
    username: string,
    room: string,
}

const users: UserType[] = []

export function UserJoin(id: string, username: string, room: string) {
    const newUser: UserType = {
        id: id,
        username: username,
        room: room
    }
    users.push(newUser)
    console.log(users)
    return newUser
}

export function FindCurrentUser(id: string) {
    console.log("searching for ", id)
    return users.find((user: UserType) => user.id === id)
}
