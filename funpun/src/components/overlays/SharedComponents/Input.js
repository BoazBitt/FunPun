import React ,{useState} from 'react'

const Input = props => {
  const {name, place, value, input} = props
  const [isValid ,setIsValid] = useState(false)

  const handleInputChange = (e) => {
    const inputValue = e.target.value

    if (name === 'email') {
      if (inputValue.trim().length !== 0 && !isValidEmail(inputValue)) {
        setIsValid(true)
      }
      else {
        setIsValid(false)
      }

    }

    props.onInputChange(e, input,isValid)
  }

  const isValidEmail = (inputValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(inputValue)
  }

  return (
    <input
      maxLength={30}
      type="text"
      name={name}
      placeholder={place}
      value={value}
      onChange={handleInputChange}
      style={(name==='email'&&isValid)?{border:'3px solid red'}:{border:'none'}}
      />
  )
}

export default Input
