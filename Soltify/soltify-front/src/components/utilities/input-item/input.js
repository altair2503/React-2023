import React from "react";
import styles from './input.module.css'

const Input = ({props, value, onChange}) => {
    return (
        <div className={styles.input_block}>
            <label>{props.name}</label>
            <input name="lastname" type={props.type} placeholder={"Enter " + (props.name.toString().toLowerCase())} value={value} onChange={onChange} />
        </div>
    )
};

export default Input;