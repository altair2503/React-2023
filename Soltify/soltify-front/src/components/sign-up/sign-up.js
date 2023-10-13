import Input from "../utilities/input";
import styles from "./sign-up.module.css"

const SignUp = ()=>{
    return (
        <div className={styles.background}>
            <div className={styles.inputs}>
                <Input props={{name: 'First name'}}/>
                <Input props={{name: 'Last name'}}/>
                <Input props={{name: 'Username'}}/>
                <Input props={{name: 'Password', type: 'password'}}/>
                <Input props={{name: 'Password verificaton', type: 'password'}}/>
                <button>Sign up</button>
                <p className={styles.text}>Already have an account? <a href="">Sign in</a></p>
            </div>
        </div>
    )
};

export default SignUp;