'use server'
import { login } from '../lib/validationSchemas'
//validation will be here
import { signIn } from '@/auth'

export async function authLogin(
  _currentState,
  formData
) {
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