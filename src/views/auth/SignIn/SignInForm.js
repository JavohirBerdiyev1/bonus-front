import React, { useState } from 'react'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { PasswordInput } from 'components/shared'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import appConfig from 'configs/app.config'
import { onSignInSuccess } from 'store/auth/sessionSlice'
import sha1 from "crypto-js/sha1";

const validationSchema = Yup.object().shape({
  login: Yup.string().required('Please enter your login'),
  password: Yup.string().required('Please enter your password'),
})

const SignInForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState({})
	const dispatch = useDispatch()
	const navigate = useNavigate()
  // Form yuborilganda:
  const handleSubmit = async (values, { setSubmitting }) => {
    const baseURL = import.meta.env;
      console.log(baseURL);
      
    setErrorMessage('') // Xatolikni avval tozalaymiz
    try {
			
			setSubmitting(true)
			const hashedPassword = sha1(values.password).toString();
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            login: values.login,
            password: hashedPassword,
          }),
        }
      )
      

      console.log('Full response:', response)

      const data = await response.json()

      if (response.ok && data?.data?.accessToken?.token) {
				setTimeout(() => {
          setSubmitting(false);
        }, 1000);
				localStorage.setItem('client-token', data.data.accessToken.token)
				sessionStorage.setItem("client-token", data.data.accessToken.token);
        sessionStorage.setItem("user-info", JSON.stringify(data.data?.employee
        ));

				const { token } =  data.data.accessToken
				
				dispatch(onSignInSuccess(token))
        navigate(appConfig.tourPath)
      } else {
        setErrorMessage(data?.message || 'Login failed!')
      }
    } catch (error) {
      setErrorMessage('Server error!')
    } 
  }

  return (
    <div>
      {errorMessage && (
        <Alert className="mb-4" type="danger" showIcon>
          {errorMessage}
        </Alert>
      )}

      <Formik
        initialValues={{ login: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form>
            <FormContainer>
              <FormItem
                label="Login"
                invalid={errors.login && touched.login}
                errorMessage={errors.login}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="login"
                  placeholder="Enter your login"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Password"
                invalid={errors.password && touched.password}
                errorMessage={errors.password}
              >
                <Field
                  autoComplete="off"
                  name="password"
                  placeholder="Enter your password"
                  component={PasswordInput}
                />
              </FormItem>

              <Button block loading={isSubmitting} variant="solid" type="submit">
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignInForm
