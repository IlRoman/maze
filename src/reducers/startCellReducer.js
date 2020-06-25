const initialState = {
    startingCell: '',
}

export const startingCellReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_START_CELL':
            return {
                ...state,
                startingCell: action.payload
            }
        default:
            return state;
    }
}