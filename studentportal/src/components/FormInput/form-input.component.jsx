import './form-input.styles.css';

const FormInput = ({ name, handleChange, ...otherProps}) => {
    return (
        <div className='group'>
            <label className='form-label' htmlFor={name}>{`${name}:`}</label>
            <input onChange={handleChange} name={name} {...otherProps}/>
        </div>
    )
}

export default FormInput;