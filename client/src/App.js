import './App.css';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import Header from './components/nav/Header'
import Auth from './pages/Auth';
import Cities from './pages/Cities'
import City from './pages/City';
import { authActions } from './redux/actions/authActions';
import Footer from './components/Footer';

function App(props) {

    if (!props.userLogged && localStorage.getItem('token')) {
        const dataUserLocalStorage = localStorage.getItem('userLogged')
        const userLocalStorage = {
            token: localStorage.getItem('token'),
            ...dataUserLocalStorage
        }
        props.logInWithLocalStorage(userLocalStorage)
    }

    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Cities} />
                {!props.userLogged && <Route path="/access" component={Auth} />}
                <Route exact path="/city/:id" component={City} />
                <Redirect to="/" />
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged
    }
}

const mapDispatchToProps = {
    logInWithLocalStorage: authActions.logInWithLocalStorage
}

export default connect(mapStateToProps, mapDispatchToProps)(App);