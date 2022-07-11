import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Link } from "react-router-dom";
import './creacion.css'
export function Creacion() {
const[state, setState] = useState({
        pesoMin: '',
        pesoMax: '',
        alturaMin: '',
        alturaMax: '',
        vidaMin: '',
        vidaMax: '',
        nombre: '',
        temperamento: '',
        peso: '',
        altura: '',
        vida: '',
        imagen: '',
        exists: false, 
        success: false,
        chooseTemps: undefined,
        hidden: true
    })   
    // eslint-disable-next-line
    useEffect(() => {
      async function getNames(){
      const names = await axios.get("https://kingdogsapi.herokuapp.com/temperaments")
      setState({
        ...state,
        chooseTemps: names.data
      })
      }
      getNames()
      // eslint-disable-next-line
    }, [])

    const handleChange = () => {
        setState({
            ...state,
            pesoMin: document.querySelector('input[name=pesoMin]').value,
            pesoMax: document.querySelector('input[name=pesoMax]').value,
            alturaMin: document.querySelector('input[name=alturaMin]').value,
            alturaMax: document.querySelector('input[name=alturaMax]').value,
            vidaMin: document.querySelector('input[name=vidaMin]').value,
            vidaMax: document.querySelector('input[name=vidaMax]').value,
            nombre: document.querySelector('input[name=nombre]').value,
            temperamento: document.querySelector('input[name=temperamento]').value,
            peso: state.pesoMin.concat(' - ').concat(state.pesoMax),
            altura: state.alturaMin.concat(' - ').concat(state.alturaMax),
            vida: state.vidaMin.concat(' - ').concat(state.vidaMax).concat(' years'),
            imagen: document.querySelector('input[name=imagen]').value,
            success: false,
        })
    }
    const handleSubmit = async e => {        
        e.preventDefault()
        const names = await axios.get("https://kingdogsapi.herokuapp.com/dogs")
        const exists = names.data.find(name => name.nombre === state.nombre)
        if(exists){
            setState({
                ...state,
                exists: true,
                success: false,
                pesoMin: document.querySelector('input[name=pesoMin]').value='',
                pesoMax: document.querySelector('input[name=pesoMax]').value='',
                alturaMin: document.querySelector('input[name=alturaMin]').value='',
                alturaMax: document.querySelector('input[name=alturaMax]').value='',
                vidaMin: document.querySelector('input[name=vidaMin]').value='',
                vidaMax: document.querySelector('input[name=vidaMax]').value='',
                nombre: document.querySelector('input[name=nombre]').value='',
                temperamento: document.querySelector('input[name=temperamento]').value='',
                imagen: document.querySelector('input[name=imagen]').value=''
            })
        }
        else{
            await axios.post("https://kingdogsapi.herokuapp.com/dogs", {
                nombre: state.nombre,
                temperamento: state.temperamento,
                peso: state.peso,
                altura: state.altura,
                vida: state.vida,
                imagen: state.imagen
            })
            setState({
                ...state,
                exists: false,
                success: true,
                pesoMin: document.querySelector('input[name=pesoMin]').value='',
                pesoMax: document.querySelector('input[name=pesoMax]').value='',
                alturaMin: document.querySelector('input[name=alturaMin]').value='',
                alturaMax: document.querySelector('input[name=alturaMax]').value='',
                vidaMin: document.querySelector('input[name=vidaMin]').value='',
                vidaMax: document.querySelector('input[name=vidaMax]').value='',
                nombre: document.querySelector('input[name=nombre]').value='',
                temperamento: document.querySelector('input[name=temperamento]').value='',
                imagen: document.querySelector('input[name=imagen]').value=''
            })
        }
    }
    const addTemp = (e) => {
      if(!state.temperamento.includes(e.target.value)){
        if(state.temperamento === ''){
          setState({
            ...state,
            temperamento: e.target.value
          })
        }
        else{
        setState({
          ...state,
          temperamento: state.temperamento.concat(', ' + e.target.value)
        })
        } 
      }
      else{
        if(state.temperamento.includes(', ' + e.target.value))
        setState({
          ...state,
          temperamento: state.temperamento.replace(', ' + e.target.value, "", "gi")
        })
        else if(state.temperamento.includes(e.target.value + ', '))
        setState({
          ...state,
          temperamento: state.temperamento.replace(e.target.value + ', ', "", "gi")
        })
        else 
        setState({
          ...state,
          temperamento: state.temperamento.replace(e.target.value, "", "gi")
        })
      }
    }
    return (
      <div className='formBox'>
        <div className='form'>
        <form onSubmit={handleSubmit}>
          <h1 className='title'>Register a new breed</h1>
          <div className='formItem2'>
            <span>Name: </span>&nbsp;
            <input className={state.exists? 'errorImput' : undefined} type="text" onChange={handleChange} value={state.nombre} name='nombre' placeholder='nombre' required />
            &nbsp;<span className='aligned'>*</span> 
          </div>        
          <div className='formItem3'>
              <span>Temperament(s):</span>&nbsp;
              <input type="text" onChange={handleChange} value={state.temperamento} name='temperamento' placeholder='curius, funny, etc...' required />
              &nbsp;<span className='aligned'>*</span>&nbsp;
          </div>    
          <div className='formItem'>
              <span>Height(kg):</span>&nbsp;
              <input className='shorterImput' type="number" min="0" onChange={handleChange} value={state.pesoMin} name='pesoMin' placeholder='min' required />
              <input className='shorterImput' type="number" min="0" onChange={handleChange} value={state.pesoMax} name='pesoMax' placeholder='max' required />
              &nbsp;<span className='aligned'>*</span> 
          </div>          
          <div className='formItem'>
              <span>Weight(cm):</span>&nbsp;
              <input className='shorterImput' type="number" min="0" onChange={handleChange} value={state.alturaMin} name='alturaMin' placeholder='min' required />
              <input className='shorterImput' type="number" min="0" onChange={handleChange} value={state.alturaMax} name='alturaMax' placeholder='max' required />
              &nbsp;<span className='aligned'>*</span> 
          </div>          
          <div className='formItem'>
              <span>Life span(years):</span>&nbsp;
              <input className='shorterImput' type="number" min="0" onChange={handleChange} value={state.vidaMin} name='vidaMin' placeholder='min' required />
              <input className='shorterImput' type="number" min="0" onChange={handleChange} value={state.vidaMax} name='vidaMax' placeholder='max' required />
              &nbsp;<span className='aligned'>*</span> 
          </div>          
          <div className='formItem4'>
              <span>Image: </span>&nbsp;
              <input type="url" onChange={handleChange} value={state.imagen} name="imagen" placeholder="Url"/>
          </div>
          <div className='formItem5'>
            <span className='requerid'>(*) required fields</span><br/>&nbsp;
          </div>
          <div className='addback'>
          <input className='btnCre' type='submit' value='Add'/>
          <Link to='/home'>
            <button className='btnCreOut'>back</button>
          </Link>
          </div>
          <div className='successbox'>
          {state.success ? <span className='success'>The breed has been created correctly</span> : undefined}
          {state.exists ? <span className='error'>oops! the breed already exists</span> : undefined}
          </div>
        </form>
        </div>
        <div className='tempsContainer'>
                {state.chooseTemps && !state.hidden && state.chooseTemps.map(e => {
                  return(
                    <div>  
                    <label for={e}>{e}</label>
                    <input onChange={(e) => addTemp(e)} type="checkbox" name={e} value={e} />    
                    </div>
                    )
                  })            
                }    
              </div> 
      </div>
    )
}

