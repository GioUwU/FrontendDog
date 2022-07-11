import React from 'react';
import { Link } from 'react-router-dom';
import './inicio.css'

export function Inicio() {
    return (
      <div className='IniCointainter'>
        <div className='dogIni'>
             <img className="imageIni" src='https://i.pinimg.com/originals/27/d6/33/27d6332add97c24febd69753b55b7f10.png' alt="" />
        </div>  
        <div className='titleIni'>
            <h1 className='titile2'>KingsDog</h1>
        </div>
          <div className='textIni'>
              <p className='textInip'>
                This project In which tools such as: React, Redux, 
                Express, Sequelize, Not counting HTML and CSS are used.
                In this web application you can search for breeds of dogs, 
                as well as create them, Although the design is not the most beautiful, 
                it was thought of as something minimalist, browser windows style.
              </p>
          <Link to= '/home'>
              <button className='btnIni'> Iniciar </button>
          </Link>  
          </div>
          <div className='responseIni'>
             <img className="responseImaIni" src='https://www.nicepng.com/png/full/422-4222639_dog-puppy-cat-pet-clip-art-cartoon-group.png' alt="" />
          </div>  
      </div>
    )
  };
  