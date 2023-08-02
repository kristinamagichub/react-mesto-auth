//функционалбный компонент для блока Header

import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/header-logo.svg'
import useFormValidation from "../../utils/useFormValidation"



//для хамбургера/ 
function Header({ name, dataUser }) {
    const [isToggled, setIsToggled] = useState(false);
    const { reset } = useFormValidation()


    function handleClick() {
        isToggled === false ? setIsToggled(true) : setIsToggled(false);
    }
    function onSignOut() {
        setIsToggled(false);
        localStorage.removeItem('jwt');
        reset({});
    }




    return (
        <header className={`header page__header ${isToggled !== false ? ' page__header_opened' : ''}`}>
            <img
                className='header__logo'
                alt='картинка логотипа'
                src={logo}
            />
            {name === 'signup' || name === 'signin' ?
                <Link to={name === 'signup' ? '/sign-in' : '/sign-up'} className='header__link'>

                    {name === 'signin' ? 'Регистрация' : 'Войти'}

                </Link>
                :
                <>
                    <div className={`header__email-container ${isToggled !== false ? 'header__email-container_opened' : ''}`}>
                        <p className='header__email'  >{dataUser}</p>
                        <Link to={`/sign-in`} className='header__unlogin' onClick={onSignOut}>Выйти</Link>
                    </div>
                    <button className={`header__button ${isToggled !== false ? 'header__button_active' : ''} `} onClick={handleClick}></button>
                </>
            }
        </header>
    )
}

export default Header