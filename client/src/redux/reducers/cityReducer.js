const initialState = {
    cities: [],
    preloaderCities: true
}

export const cityReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ALL_CITIES':
            const { cities, preloaderCities } = action.payload
            return { ...state, cities, preloaderCities }

        default:
            return state
    }

}