'use server'
//validation will be here
import signIn from '@/auth'
export async function authenticate(
    prevState,
    formData
  ) {
    try {
      //await signIn('credentials', formData);
      const email = formData.get("email")
      const password = formData.get("password")
      console.log(email)
      console.log(password)
      return {
        status: "error",
        message: `There is a Server Error`,
       // message: `Please confirm via email: ${email}!`,
      }
    } catch (error) {
      console.log("sign in error")
      console.log(error)

      if (error /* instanceof AuthError */) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
}