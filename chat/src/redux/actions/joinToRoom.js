export const joinToRoom = (user) => {
    return {
        type: 'joinToRoom',
        payload: user
    }
}