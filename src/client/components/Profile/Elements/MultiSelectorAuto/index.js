import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import {limit} from 'firebase/firestore'
import './style.css'

export default function MultiSelctorAuto(props) {
  const {
    options = [],
    label = '',
    helperText = '',
    limitSelection = null,
    defaultValue = [],
    setState = (state) => {},
    id = '',
  } = props

  const printLabel = label
    ? label
        .split(/[^\w]+/gm)
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .filter((word) => word != '')
        .join(' ')
    : ''

  const [value, setValue] = useState(defaultValue ? [...defaultValue] : [])

  const handleChange = (e, val) => {
    e.preventDefault()
    if (!limitSelection || val.length <= +limitSelection) {
      setValue(val)
      setState(val)
    }
  }
  return (
    <Autocomplete
      freeSolo
      multiple
      id={id}
      options={options.sort()}
      value={value}
      getOptionDisabled={(option) =>
        limitSelection && value.length === +limitSelection ? true : false
      }
      filterSelectedOptions
      onChange={(event, value) => handleChange(event, value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={printLabel}
          helperText={helperText}
          value={value}
          disabled={limitSelection && value.length === +limitSelection}
        />
      )}
    />
  )
}
