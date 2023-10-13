import styles from './input.module.css'

const Input = ({props}) => {
    return (<div className={styles.input_block}>
        <label>{props.name}</label>
        <input name="lastname" type="text" placeholder={"Enter " + props.name}/>
    </div>)
};

export default Input;