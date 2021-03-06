import { ErrorMessage, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Header } from 'semantic-ui-react'
import MyTextInput from '../../app/common/form/MyTextInput'
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';

export default observer(function RegisterForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.register(values).catch(error => setErrors({ error }))}
            validationSchema={Yup.object({
                displayName: Yup.string().required('Display Name is required.'),
                username: Yup.string().required('Username is required.'),
                email: Yup.string().required('Email is required.')
                                   .email('Email is not valid email.'),
                password: Yup.string()
                             .required('Password is required.')
                             .min(4, 'Password is too short - should be 4 char minimum.')
                             .max(8, 'Password is too long - should be 8 char maximum.')
                             .matches(/(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/, 'Password must contain symbols, numbers, lowercase and uppercase.'),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Reactivities' color='teal' textAlign='center' />
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <MyTextInput name='username' placeholder='Username' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage
                        name='error'
                        render={() => <ValidationErrors errors={errors.error}/>}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Register' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})