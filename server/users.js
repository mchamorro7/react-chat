const users = [];

/**
 * Add user to array if not exist
 * @param {*} User
 */
const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((u) => u.room === room && u.name === name);

    if (existingUser) {
        return { error: 'Username already exist' };
    }

    const newUser = { id, name, room };

    console.log({ newUser: newUser });

    users.push(newUser);

    return { newUser };
}

/**
 * Remove user from array
 * @param {*} id 
 */
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) return users.splice(index, 1)[0];
}

/**
 * Get a especific user
 * @param {*} id 
 */
const getUser = (id) => users.find((user) => user.id === id);

/**
 * Get all users in room
 * @param {*} room 
 */
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };