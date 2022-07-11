import { connect } from "react-redux";
import { getId } from '../actions/actions'
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import './detalles.css'


const Detalles = (props) => {   
    // eslint-disable-next-line 
    useEffect(() => props.getId(props.match.params.id), [props.match.params.id]) 
    return ( 
        <div className='detContainer'>
            {props.det ?
            <div >
            <div className='detBox'>
                <img className='imgDet' src={props.det.imagen} width="360" height="240" alt="" />
                <div className='textDet'>
                    <div className='textDetItem'><span>Name:</span>&nbsp;<span>{props.det.nombre}</span></div>
                    <div className='textDetItem'><span>Temperament(s):</span>&nbsp;<span>{props.det.temperamento}</span></div>
                    <div className='textDetItem'><span>Weight:</span>&nbsp;<span>{props.det.peso}&nbsp;kg</span></div>
                    <div className='textDetItem'><span>Height:</span>&nbsp;<span>{props.det.altura}&nbsp;cm</span></div>
                    <div className='textDetItem'><span>Life span:</span>&nbsp;<span>{props.det.vida}&nbsp;</span></div>
                </div>
                <div className=''>
                  <Link to='/home'>
                   <button className='btnDet'>Back</button>
                  </Link>
                </div>
            </div>
            </div>
            : 
            <div className='loadingDet'>  
              <div><img src='' alt="" /></div>
              <div><span>Loading..</span></div>

            </div> 

            }
        </div>
        )
};

  function mapStateToProps(state) {
    return {
        det:state.detalle
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        getId: id => dispatch(getId(id)),
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Detalles);