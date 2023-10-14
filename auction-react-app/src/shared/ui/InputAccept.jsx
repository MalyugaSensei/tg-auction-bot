import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { InputGroup } from 'react-bootstrap'

function InputAccept({ label, placeholder, onClick }) {
    const [sticketField, setStickerField] = useState('')
    const [valid, setValid] = useState(true)

    const onClickHandler = (text) => {
        if (text.length) {
            onClick(text)
            setStickerField('')
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
        setStickerField(event.target.value)
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
                    defaultValue={sticketField} onChange={onChangeHandler}
                    isInvalid={!valid} />
            </Form.FloatingLabel>
            <Form.Control.Feedback type="invalid">
                Введите название наклейки
            </Form.Control.Feedback>
            <Button
                variant='outline-success'
                onClick={() => onClickHandler(sticketField)}
            >
                <i className='gg-check'></i>
            </Button>
        </InputGroup>

    )
}

export { InputAccept }