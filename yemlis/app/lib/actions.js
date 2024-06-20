'use server'
import { login, register } from '../lib/validationSchemas'
//validation will be here
import { signIn } from '@/auth'

export async function authLogin(
  _currentState,
  formData
) {
  console.log("formData")
  console.log(formData)
  try {
    //await signIn('credentials', formData);
    const email = formData.get("email")
    const password = formData.get("password")
    console.log(email)
    console.log(password)
    const validatedLoginParams = await login.validateAsync({ email, password });
    console.log("login is ok")
    console.log("validatedLoginParams")
    console.log(validatedLoginParams)

    try {
      await signIn('credentials', formData)

    } catch (signInError) {

      if (signInError /* instanceof AuthError */) {
        console.log("signInError")
        console.log(signInError)
        switch (signInError.type) {
          case 'CredentialsSignin':
            console.log("Invalid credentials")
            return 'Invalid credentials.';
          default:
            console.log("Invalid credentials")
            return 'Something went wrong.';
        }
      }
      throw signInError;
    }
  } catch (validationError) {
    console.log("validationError")
    console.log(validationError)
    return "validationError"
  }
}
export async function authRegister(
  _currentState,
  formData
) {
  console.log("formData")
  console.log(formData)
  try {
    //await signIn('credentials', formData);
    const email = formData.get("email")
    const password = formData.get("password")
    const repeatpassword = formData.get("repeatpassword")
    const acceptmails = formData.get("acceptmails")
    const acceptterms = formData.get("acceptterms")

    const validatedRegisterParams = await register.validateAsync(
      { email, password, repeatpassword, acceptmails, acceptterms });
   
      console.log("register is ok")
    console.log("validatedRegisterParams")
    console.log(validatedRegisterParams)

    try {
      await signIn('credentials', formData)

    } catch (signInError) {

      if (signInError /* instanceof AuthError */) {
        console.log("signUpError")
        console.log(signInError)
        switch (signInError.type) {
          case 'CredentialsSignUp':
            console.log("Invalid credentials")
            return 'Invalid credentials.';
          default:
            console.log("Invalid credentials")
            return 'Something went wrong.';
        }
      }
      throw signInError;
    }
  } catch (validationError) {
    console.log("validationError")
    console.log(validationError)
    return "validationError"
  }
}