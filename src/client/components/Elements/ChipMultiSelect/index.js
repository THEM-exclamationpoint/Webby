import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, 
        OutlinedInput, 
        Select,
        Chip, 
        InputLabel, 
        Box, 
        FormControl,
        FormHelperText,
        MenuItem,
      } from '@mui/material';
import './style.css';

const ChipMultiSelect = (props) => {
  const {
    options = [],
    label = 'multi-select',
    required = false,
    helperText,
    limitSelection = null,
  } = props;

  const printLabel = 
    label
      .split(/[^\w]+/gm)
      .map(word => word[0].toUpperCase()+word.slice(1))
      .join(' ');

  const [optionsSelected, setOption] = useState([]);

  const handleChange = (e) => {
    const {target: { value }} = e;
    if(!limitSelection || value.length <= +limitSelection) setOption(value);
    }

  return (
    <div className='chip-multi-select'>
      <FormControl required={required}>
        <InputLabel id={`${label}-label`}>
          {printLabel}
        </InputLabel>
        <Select
          style={{'width' : '200px'}}
          labelId={`${label}-label`}
          id={`${label}`}
          multiple
          value={optionsSelected}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
        {helperText ? <FormHelperText>{helperText}</FormHelperText> : ''}
      </FormControl>
    </div>
  )
}

export default ChipMultiSelect;