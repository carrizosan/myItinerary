import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'

import { itineraryActions } from '../redux/actions/itineraryActions'
import Itinerary from '../components/Itinerary'
import Preloader from '../components/Preloader'
import NotYetCard from '../components/NotYetCard'


const City = (props) => {
    const { cities, getItineraries, cleanItineraries, itineraries, preloader } = props

    const cityId = props.match.params.id
    const city = cities.find(city => city._id === cityId)

    useEffect(() => {
        if (cities.length === 0) {
            props.history.push('/')
        } else {
            getItineraries(cityId)
        }
        window.scrollTo(0, 0);
        return () => cleanItineraries()
    }, [])

    return (
        <div className="cityContainer">
            <h2>{city && city.name}</h2>
            {
                preloader
                    ? <Preloader />
                    : itineraries.length === 0
                        ? <NotYetCard>
                            Itineraries have not been added yet! 
                            Come back soon!
                        </NotYetCard>
                        : itineraries.map(itinerary => < Itinerary key={itinerary._id}  {...itinerary} />)
            }
            <div className="buttonBackCities" onClick={() => props.history.push('/')}>
                <span>Back cities</span>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cities: state.cityReducer.cities,
        itineraries: state.itineraryReducer.itineraries,
        preloader: state.itineraryReducer.preloaderItineraries
    }
}

const mapDispatchToProps = {
    getItineraries: itineraryActions.getItineraries,
    cleanItineraries: itineraryActions.cleanItineraries
}

export default connect(mapStateToProps, mapDispatchToProps)(City)
