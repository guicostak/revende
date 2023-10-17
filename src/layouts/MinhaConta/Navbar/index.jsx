import Logo from "../../../components/public/Logo";
import React from 'react';
import './Navbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import Login from '../../public/Login'
import DropdownPerfil from "../../../components/MinhaConta/DropdownPerfil";

const Navbar = ({}) => {

    const [modalIsOpen, setModalIsOpen] = useState('none');
    const [isLogin, setIsLogin] = useState()

    const openModal = (login) => {
        setIsLogin(login)
        setModalIsOpen('flex')
    }

    const closeModal = () => {
      setModalIsOpen('none')
    }
    
    const changeModal = () => {
        if(isLogin === true) {
            setIsLogin(false)
        }
        else {
            setIsLogin(true)
        }
    } 

    const itens = [
        {
          path: '',
          text: '',
          clickable: false,
          img: <FontAwesomeIcon className='icone' icon={faCircleQuestion} style={{ color: '#E82C4F' , fontSize: '1.1rem'}} />,
        },
        {
          path: '',
          text: 'entrar',
          clickable: true,
          img: '',
        },
    ]
      
    return (  
        <>    
        <Login 
        displayStatus={modalIsOpen}
        closeModal={() => closeModal()}
        changeModal={() => changeModal()}
        isLogin={isLogin}
        />
        <div className="container-fluid">
            <nav id="navbar" className="col-md-12 col-sm-12 col-12">
                <div className="row">     
                    <div className="col-md-6 row justify-content-start align-items-center">
                        <div className="col-md-auto text-center">
                            <Logo maxw="10em" />
                        </div>
                        <div className="col-md-auto text-center">
                            <h3 className="titulo-nav">configurações da conta</h3>
                        </div>
                    </div>      
                    <div className="col-md-6 row justify-content-end align-items-center col-sm-12">
                        <DropdownPerfil />
                    </div>                    
                </div>   
            </nav>
        </div> 
        </>      
    )
}

export default Navbar;
