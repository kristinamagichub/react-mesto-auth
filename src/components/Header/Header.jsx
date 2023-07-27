//функционалбный компонент для блока Header

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/header-logo.svg'



//для хамбургера/ 
function Header({ name, dataUser }) {
    const [isToggled, setIsToggled] = useState(false);



    function handleClick() {
        isToggled === false ? setIsToggled(true) : setIsToggled(false);
    }
    function onSignOut() {
        setIsToggled(false);
        localStorage.removeItem('jwt')
    }

    //для нормального отображения на экране при повороте телефона
    useEffect(() => {
        function closeHumburgerToResize() {

            if (isToggled === true) {
                window.addEventListener('resize', closeHumburgerToResize);
                return () => window.removeEventListener('resize', closeHumburgerToResize); // cобытие resize kak escape 
            }
        }
        if (document.documentElement.clientWidth > '767') {
            setIsToggled(false);
            window.removeEventListener('resize', closeHumburgerToResize);
        }
    }, [isToggled])


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