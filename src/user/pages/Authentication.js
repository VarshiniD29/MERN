import React, { useContext, useState } from 'react'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validation';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import './Auth.css'
import { AuthContext } from '../../shared/context/auth-context';
import '../../places/pages/Placeform.css'

const Auth = () => {
    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);

    const [ formState, inputHandler, setFormData] = useForm(
        {
          email: {
            value: '',
            isValid: false
          },
          password: {
            value: '',
            isValid: false
          }
        },
        false
      );
    
const switchModeHandler = () => {
    if(!isLoginMode) {
        setFormData({
            ...formState.inputs,
            name: undefined
        } , 
        formState.inputs.email.isValid && formState.inputs.password.isValid);
    } else {
        setFormData ({ 
            ...formState.inputs,
            name: {
                value: '',
                isValid: false
            }
        }, false);  
           }
    setIsLoginMode(prevMode => !prevMode);
};

const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs)
    auth.login();
}

 return (
    <Card className= "authentication">
    <h2>Login Required </h2>
    <hr />
    <form className='place-form' onSubmit = {authSubmitHandler}>
    {!isLoginMode && (
        <Input 
        element = "input"
        id = "name"
        type = "text"
        label = "Your Name"
        validators = {[VALIDATOR_REQUIRE]}
        errorText = "Please enter a valid name"
        onInput = {inputHandler} />
    )
    }

    <Input
       id="Email"
       element="input"
       type= "email"
       label="E-mail"
       validators={[VALIDATOR_EMAIL]}
       errorText="Please enter a valid Email address."
       onInput = {inputHandler}
    />
    <Input
       id="Password"
       element="input"
       type="text"
       label="Password"
       validators={[VALIDATOR_MINLENGTH(8)]}
       errorText="Please enter a valid Password.(atleast 8 characters)"
       onInput = {inputHandler}
    />
    
    <Button type="submit" diabled = {!formState.isValid} >
      {isLoginMode ? 'LOGIN' : 'SIGNUP'}
    </Button>
  </form>
  <Button inverse onClick = {switchModeHandler}> Switch to {isLoginMode ? 'SIGNUP' : 'LOGIN'} </Button>
  </Card>
 )
 };

export default Auth;