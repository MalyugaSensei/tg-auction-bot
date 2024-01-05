import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { FormFeedback } from '@/shared/ui/FormFeedback'
import { InputStickers } from '@/features/auction-form/ui/AddSticker'
import { tg } from '@/shared'

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './CustomDatePicker.css'
import './CustomTimePicker.css'

const wearArray = [
    { title: 'Factory New', value: "factory_new", range: [0, 0.07] },
    { title: 'Minimal Wear', value: "minimal_wear", range: [0.07, 0.15] },
    { title: 'Field-Tested', value: "field_-_tested", range: [0.15, 0.37] },
    { title: 'Well-Worm', value: 'well_-_worm', range: [0.37, 0.45] },
    { title: 'Battle-Scarred', value: 'battle_-_scarred', range: [0.45, 1.01] },
]

export const AuctionForm = () => {

    const {
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
        watch,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        tg.ready()
    }, [])

    watch('lotFloat')

    const onSubmit = (data) => {
        console.log(data)
        tg.sendData(JSON.stringify(data))
    }

    const dynamicLotWear = (item) => {
        let lotFloat = getValues('lotFloat');

        if (!lotFloat) {
            return false;
        }

        if (!item) {
            return false;
        }

        if (lotFloat >= item.range[0] && lotFloat < item.range[1]) {
            setValue('lotWear', item.value)
            return true;
        }

    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3'>
                <Form.FloatingLabel
                    label="Лот">
                    <Form.Control
                        autoComplete='off'
                        type='text'
                        size='lg'
                        placeholder='Введите наименование лота'
                        {...register("lotName", {
                            required: 'Введите имя лота'
                        })} />
                </Form.FloatingLabel>
                <FormFeedback field={errors.lotName} />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.FloatingLabel
                    label="Float">
                    <Form.Control
                        autoComplete='off'
                        type='number'
                        step=".000000000000000001"
                        size='lg'
                        pattern="[0-9]*[.,]?[0-9]*"
                        placeholder='Введите Float лота'
                        {...register("lotFloat", {
                            required: 'Введите Float лота',
                            valueAsNumber: true,
                            min: {
                                value: 0,
                                message: "Значение может быть в пределах 0 и 1"
                            },
                            max: {
                                value: 1,
                                message: "Значение может быть в пределах 0 и 1"
                            },
                        })} />
                </Form.FloatingLabel>
                <FormFeedback field={errors.lotFloat} />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label style={{ lineHeight: 1 }}>Изношеность</Form.Label>
                <div className='d-flex flex-wrap'>
                    <div role='group' className='btn-group'>
                        {wearArray.map((item, idx) => {
                            return (
                                <>
                                    <input
                                        className="btn-check"
                                        type="radio"
                                        id={`radio-${idx}`}
                                        autoComplete='off'
                                        checked={dynamicLotWear(item)}
                                        value={item.value}
                                        {...register('lotWear',
                                            { required: "Выберите изношенность предмета" }
                                        )} />
                                    <label tabIndex="0" htmlFor={`radio-${idx}`} className="btn btn-outline-primary btn-sm">{item.title}</label>
                                </>
                            )
                        })}
                    </div>
                </div>
                <FormFeedback field={errors.lotWear} />
            </Form.Group>
            <Form.Group className='mb-3'>
                <InputStickers control={control} />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.FloatingLabel
                    label="Начальная цена">
                    <Form.Control
                        autoComplete='off'
                        type='number'
                        size='lg'
                        defaultValue={10}
                        placeholder='Введите начальную цену (по умолчанию 10)'
                        {...register("lotStartPrice", {
                            required: "Введите начальную цену лота"
                        })} />
                </Form.FloatingLabel>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.FloatingLabel
                    className='form-floating-date'
                    label="Дата и время начала аукциона">
                    <Form.Control
                        type='datetime-local'
                        size='lg'
                        style={{ paddingTop: "1.8rem" }}
                        placeholder='дд.мм.гггг --:--'
                        {...register('finishAt', {
                            required: "Обязательное поле",
                            validate: {
                                validateDate: (date) => {
                                    if (new Date(date) >= new Date()) {
                                        return true
                                    } else {
                                        return "Дата должна быть в будущем"
                                    }
                                }
                            }
                        })}
                    />
                </Form.FloatingLabel>
                <FormFeedback field={errors.finishAt} />
            </Form.Group>
            <Button variant='primary' size='lg' className='w-100' type='submit'>
                Создать
            </Button>
        </Form >
    )
}