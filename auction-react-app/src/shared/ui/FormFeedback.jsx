
/**
 * @param { Object } props
 * @param { Object } field
 * @returns { JSX.Element } 
 */
export const FormFeedback = ({ field }) => {
    if (field) {
        return (
            <div className='invalid-feedback d-block'>
                {field.message}
            </div>
        )
    }
    return null
}
