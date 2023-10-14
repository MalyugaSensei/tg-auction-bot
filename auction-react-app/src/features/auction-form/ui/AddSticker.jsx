import { InputAccept } from '@/shared/ui'
import Button from 'react-bootstrap/Button'
import FormLabel from 'react-bootstrap/FormLabel'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { useFieldArray } from 'react-hook-form'

export const InputStickers = ({ control }) => {
    let fieldArrayName = 'lotStickers'
    const { fields, append, remove } = useFieldArray({
        control,
        name: fieldArrayName
    })
    const onClick = (text) => {
        append({ title: text })
    }

    if (!fields.length) {
        return <InputAccept label='Наклейка' placeholder='Ввдеите название наклейки' onClick={onClick} />
    }
    return (
        <>
            <FormLabel>
                Наклейки
            </FormLabel>
            <ListGroup className='mb-3'>
                {
                    fields.map((sticker, index) => (
                        <div className='d-flex input-group mb-1'>
                            <ListGroupItem style={{ flex: 1 }}>
                                {sticker.title}
                            </ListGroupItem>
                            <Button variant='danger' onClick={() => remove(index)}><i className='gg-close' /></Button>
                        </div>

                    )
                    )
                }
            </ListGroup>
            <InputAccept label='Наклейка' placeholder='Ввдеите название наклейки' onClick={onClick} />
        </>

    )
}

