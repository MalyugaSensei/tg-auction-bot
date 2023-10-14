import Form from "react-bootstrap/Form"

/**
 * 
 * @param { Object } props
 * @param { String } props.value
 * @param { (...event: any[]) => void } props.onChange
 * @returns 
 */
const TimePicker = ({ value = null, onChange }) => {
    /**
     * 
     * @param { React.ChangeEvent<FormControlElement> } event 
     */
    const onChangeHandler = (event) => {
        let value = event.target.value;
        onChange(value)
    }

    return (
        <Form.Control
            type="time"
            size="lg"
            value={value || null}
            onChange={onChangeHandler}
        />
    )
}

export { TimePicker }