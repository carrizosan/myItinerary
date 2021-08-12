import React, { useEffect, useState } from "react";
import { CityCard } from "../components/CityCard";

import { connect } from "react-redux";
import { cityActions } from "../redux/actions/cityActions";
import Preloader from "../components/Preloader";
import NotYetCard from "../components/NotYetCard";

const Cities = (props) => {
  useEffect(() => {
    props.allCities();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='citiesContainer'>
      {props.preloaderCities ? (
        <Preloader />
      ) : props.cities.length > 0 ? (
        props.cities.map((city) => <CityCard key={city._id} {...city} />)
      ) : (
        <NotYetCard>Cities have not been added yet</NotYetCard>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cities: state.cityReducer.cities,
    preloaderCities: state.cityReducer.preloaderCities,
  };
};

const mapDispatchToProps = {
  allCities: cityActions.allCities,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
