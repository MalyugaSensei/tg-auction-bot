import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { InputGroup } from 'react-bootstrap'

/**
 * @param { any } props 
 * @returns 
 */
function InputAccept({ label, placeholder, onClick, errorMessage }) {
    const [value, setValue] = useState('')
    const [valid, setValid] = useState(true)

    const onClickHandler = (text) => {
        if (text.length) {
            onClick(text)
            setValue('')
            setValid(true)
            return;
        }
        setValid(false)
        return;

    }

    const onChangeHandler = (event) => {
        if (event.target.value) {
            setValid(true)
        }
        setValue(event.target.value)
    }
    return (
        <InputGroup className='d-flex mb-3'>
            <Form.FloatingLabel
                label={label}
            >
                <Form.Control
                    className='me-2'
                    type='text'
                    size='lg'
                    placeholder={placeholder}
                    defaultValue={value}
                    onChange={onChangeHandler}
                    isInvalid={!valid} />
            </Form.FloatingLabel>
            <Form.Control.Feedback type="invalid">
                {errorMessage}
            </Form.Control.Feedback>
            <Button
                variant='outline-success'
                onClick={() => onClickHandler(value)}
            >
                <i className='gg-check'></i>
            </Button>
        </InputGroup>
    )
}

export { InputAccept }