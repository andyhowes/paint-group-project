import React, { useState, useEffect, Children } from 'react';
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import './SpecialFeature.css';
import LanguageToggleButton from '../LanguageToggleButton/LanguageToggleButton';
import SpecialFeature from './SpecialFeature';

const { v4: uuidv4 } = require('uuid');

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

let SpecialFeatureBox = () => {
  const [count, setCount] = useState(0);

  const arrayFromCount = [...Array(count).keys()];

  return (
    <div>
      <h2>Special Features</h2>
      <button onClick={() => setCount(count + 1)}>Add Special Feature</button>
      {arrayFromCount.map((_, index) => <div><SpecialFeature key={index} /><br /></div>)}
      {arrayFromCount.length ?
      ( <div>
          <button onClick={() => setCount(count + 1)}>Add Special Feature</button>
          <button key={uuidv4()} onClick={()=>
          {setCount(count - 1)}}>Delete</button>
        </div>
      ) : (<br />)}
    </div>
  )
}

export default SpecialFeatureBox;