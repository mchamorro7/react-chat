// Define reducer initial state
const initialState = {
    name: '',
    room: ''
}

export const reducer = (state = initialState, action) => {
    let payload;
    switch (action.type) {
        case "joinToRoom":
            payload = action.payload;
            // console.log('joinToRoomFromReducerUser', payload);
            return {
                ...state,
                name: payload.name,
                room: payload.room
            };
        default:
            return state
    }
}