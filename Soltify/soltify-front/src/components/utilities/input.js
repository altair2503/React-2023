import styles from './input.module.css'

const Input = ({props}) => {
    return (<div className={styles.input_block}>
        <label>{props.name}</label>
        <input name="lastname" type={props.type} placeholder={"Enter " + (props.name.toString().toLowerCase())}/>
    </div>)
};

export default Input;