const initialState = {
    arrows: [],
    count: 0,
}

const arrowsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ARROW':
            return {
                arrows: [
                    ...state.arrows,
                    action.payload.arrowDirection,
                ]
            }
        default:
            return state;
    }
}

export default arrowsReducer;