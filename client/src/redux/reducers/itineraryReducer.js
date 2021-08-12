const initialState = {
    itineraries: [],
    preloaderItineraries: true
}

export const itineraryReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ITINERARIES_CITY':
            return action.payload

        case 'CLEAN_ITINERARIES':
            return action.payload

        default:
            return state
    }

}