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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
    if(!limitSelection || value.split(',').length < +limitSelection) {
      setOption(
        typeof value === 'string' ? 
          value.split(',') 
          : 
          value
      );
    }
  };

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
          MenuProps={MenuProps}
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