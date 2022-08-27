import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { limit } from 'firebase/firestore';
import './style.css'

export default function MultiSelctorAuto(props) {
  const {
    options = [],
    label = '',
    required = false,
    helperText = null,
    limitSelection = null,
    defaultValue = null,
  } = props;

  const printLabel = 
    label ?
    label
      .split(/[^\w]+/gm)
      .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .filter(word => word != '')
      .join(' ')
    :
    '';

  const [optionsSelected, setOption] = useState(defaultValue ? [...defaultValue] : []);

  const handleChange = (e, value) => {
    if(!limitSelection || value.length <= +limitSelection) {}
      setOption(value);
  }

  return (
      <div className = 'multi-select-auto'>
        <Autocomplete
          freeSolo={limitSelection ? optionsSelected.length < +limitSelection : true}
          style={{'width' : '20rem'}}
          multiple
          id={label}
          options={options.sort()}
          value={optionsSelected}
          required={required}
          getOptionDisabled={(option) => (limitSelection && optionsSelected.length === +limitSelection ? true : false)}
          filterSelectedOptions
          onChange={(event, value) => handleChange(event, value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={printLabel}
              required={required}
              helperText={helperText}
              disabled={limitSelection && optionsSelected.length === +limitSelection}
            />
          )}
        />
      </div>
  );
}