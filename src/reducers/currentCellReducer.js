const initialState = {
    currentCell: '',
}

export const currentCellReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_CELL':
            return {
                ...state,
                currentCell: action.payload
            }
        default:
            return state;
    }
}