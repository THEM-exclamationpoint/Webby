import React, {useState, useEffect} from 'react'
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import './style.css'

const filter = createFilterOptions()

export default function MultiSelectorAuto(props) {
  const {
    options = [],
    label = '',
    helperText = '',
    limitSelection = null,
    defaultValue = [],
    setState = (state) => {},
    id = '',
    fullWidth = false,
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
      aria-label={`${printLabel} entry field`}
      fullWidth={fullWidth}
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
