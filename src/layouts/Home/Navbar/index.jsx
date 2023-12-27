import Logo from "../../../components/public/Logo";
import React from 'react';
import './Navbar.scss'
import CaixaDePesquisa from "../../../components/home/CaixaDePesquisa"
import Botao from "../../../components/public/Botao";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import Localizacao from "../../../components/public/Localizacao";
import { useState } from "react";
import Login from '../../public/Login'
import DropdownPerfil from "../../../components/MinhaConta/DropdownPerfil";
import '../../../components/public/ItemLista/ItemLista.scss'
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

const Navbar = ({}) => {

    const [modalIsOpen, setModalIsOpen] = useState('none');
    const [isLogin, setIsLogin] = useState()
    const [isAuthenticated, setIsAthenticated] = useState(Cookies.get('isAthenticated'))
    const [name, setName] = useState(Cookies.get('name') ? Cookies.get('name').split(' ')[0] : null)

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
                        <div className="col-md-8 col-sm-12">
                            <CaixaDePesquisa />
                        </div>
                    </div>      
                    <div className="col-md-6 row justify-content-end align-items-center col-sm-12">
                    <div className="col-md-4 text-center col-sm-5">
                            <Localizacao />
                        </div>
                        <div style={{display: isAuthenticated ? 'flex' : 'none', justifyContent: 'right'}} className="col-md-5 text-center align-items-center col-sm-3">
                            <div className="item-lista col-md-1 col-sm-6">
                                <Link className="link">
                                    <FontAwesomeIcon className="icone" icon={faCircleQuestion} style={{ color: '#E82C4F' }} />
                                </Link>
                            </div>
                            <div style={{marginLeft: '1rem'}} className="logado-nav col-md-8  col-sm-6">
                                <DropdownPerfil />
                                <span>Olá {name}!</span>
                            </div> 
                        </div>
                        <div style={{display: !isAuthenticated ? 'flex' : 'none'}} className="col-md-2 text-center align-items-center col-sm-3">
                            <div className="item-lista col-md-6 col-sm-6">
                                <Link className="link">
                                    <FontAwesomeIcon className="icone" icon={faCircleQuestion} style={{ color: '#E82C4F' }} />
                                </Link>
                            </div>
                            <div onClick={() => openModal(true)} className="item-lista col-md-6 col-sm-6">
                                <div className="link">
                                    <span>entrar</span> 
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 text-center align-items-center col-sm-3">
                            <Botao
                            onClick={() => openModal(false)} 
                            text={'quero vender'} 
                            />
                        </div>                        
                    </div>                    
                </div>   
            </nav>
        </div> 
        </>      
    )
}

export default Navbar;
