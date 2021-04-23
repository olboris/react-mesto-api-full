import React from 'react';
import headerLogo from '../images/header-logo.svg';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

function Header(props) {
    const history = useHistory();
    function signOut() {
        localStorage.removeItem('token');
        history.push("/sign-in");
    }
    return (
        <header className="header">
            <img alt="Лого" className="header__logo" src={headerLogo} />
            <div className="header__container">
                <Switch>
                    <Route exact path="/sign-up">
                        <Link className="header__button" to="/sign-in">Войти</Link>
                    </Route>
                    <Route exact path="/sign-in">
                        <Link className="header__button" to="/sign-up">Регистрация</Link>
                    </Route>
                    <Route path="/">
                        <h2 className="header__email">{props.userEmail}</h2>
                        <button className="header__button header__button_exit" onClick={signOut}>Выйти</button>
                    </Route>
                </Switch>
            </div>
        </header>
    );
}

export default Header;