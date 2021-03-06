import { ErrorMessage, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Header, Label } from 'semantic-ui-react'
import MyTextInput from '../../app/common/form/MyTextInput'
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';

export default observer(function LoginForm() {
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => setErrors({error: 'Ivalid email or password'}))}
            validationSchema={Yup.object({
                email: Yup.string().required('Email is required.')
                                   .email('Email is not valid email.'),
                password: Yup.string()
                             .required('Password is required.')
                             .min(4, 'Password is too short - should be 4 char minimum.')
                             .max(8, 'Password is too long - should be 8 char maximum.')
                             .matches(/(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/, 'Password must contain symbols, numbers, lowercase and uppercase.')
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center'/>
                    <MyTextInput name='email' placeholder='Email'/>
                    <MyTextInput name='password' placeholder='Password' type='password'/>
                    <ErrorMessage
                        name='error' 
                        render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>}    
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Login' type='submit' fluid/>
                </Form>
            )}
        </Formik>
    )
})