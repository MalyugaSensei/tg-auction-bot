import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { useEffect } from 'react'

const tg = window.Telegram.WebApp

const wearArray = [
    'Factory New',
    'Minimal Wear',
    'Field-Tested',
    'Well-Worm',
    'Battle-Scarred'
]

export const AuctionForm = () => {

    useEffect(() => {
        tg.ready()
    }, [])

    const onClose = () => {
        tg.close()
    }

    return (
        <Form onSubmit={onClose}>
            <Form.FloatingLabel
                label="Лот"
                className='mb-3'>
                <Form.Control type='text' placeholder='Введите наименование лота' />
            </Form.FloatingLabel>
            <Form.FloatingLabel
                label="Float"
                className='mb-3'>
                <Form.Control type='number' step='0.01' placeholder='Введите Float лота' />
            </Form.FloatingLabel>
            <Form.Group className='mb-3'>
                <Form.Label>Изношеность</Form.Label>
                <div className='d-flex flex-wrap'>
                    {wearArray.map(item => (
                        <h5>
                            <Badge className='me-3' bg='secondary'>{item}</Badge>
                        </h5>
                    ))}
                </div>
            </Form.Group>

            <Form.FloatingLabel
                label='Наклейка'
                className='d-flex mb-3'
            >

                <Form.Control className='me-2' type='text' placeholder='Ввдеите название наклейки' />
                <Button variant='outline-success'>
                    <i className='gg-check'></i>
                </Button>
            </Form.FloatingLabel>
            <Form.FloatingLabel
                label="Начальная цена"
                className='mb-3'>
                <Form.Control type='number' defaultValue={10} placeholder='Введите начальную цену (по умолчанию 10)' />
            </Form.FloatingLabel>
            <Button variant='primary' className='w-100' type='submit'>
                Создать
            </Button>
        </Form>
    )
}