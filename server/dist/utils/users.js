// Could use a database for this stuff as well
const users = [];
export function UserJoin(id, username, room) {
    const newUser = {
        id: id,
        username: username,
        room: room
    };
    users.push(newUser);
    console.log(users);
    return newUser;
}
export function FindCurrentUser(id) {
    console.log("searching for ", id);
    return users.find((user) => user.id === id);
}
