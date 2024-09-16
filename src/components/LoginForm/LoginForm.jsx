import css from './LoginForm.module.css';
import * as Yup from 'yup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';

import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { login } from '../../redux/auth/operations';
import { selectAuthError } from '../../redux/auth/selectors';

const LoginForm = () => {
  const isError = useSelector(selectAuthError);
  const dispatch = useDispatch();

  const onLogin = (values, actions) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        toast.success('Login was successful', {
          style: {
            border: '1px solid rgb(0, 106, 255)',
            padding: '16px',
            color: 'rgb(0, 106, 255)',
          },
          iconTheme: {
            primary: 'rgb(0, 226, 45)',
            secondary: '#FFFAEE',
          },
        });
      });
    actions.resetForm({ values: { ...values, password: '' } });
  };
  const emailId = nanoid();
  const passwordId = nanoid();

  const LoginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be valid ')
      .required('Email is required')
      .min(3, 'Too Short!')
      .max(50, 'Too Long!'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password is too short')
      .max(50, 'Password is too long'),
  });
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={onLogin}
      validationSchema={LoginValidationSchema}
    >
      <Form className={css.form}>
        <div className={css.inputContainer}>
          <label htmlFor={emailId}>Email</label>
          <Field type="text" name="email" id={emailId} className={css.input} />
          <ErrorMessage
            className={css.errorMessage}
            name="email"
            component="span"
          />
        </div>
        <div className={css.inputContainer}>
          <label htmlFor={passwordId}>Password</label>
          <Field
            type="password"
            name="password"
            id={passwordId}
            className={css.input}
          />
          <ErrorMessage
            className={css.errorMessage}
            name="password"
            component="span"
          />
        </div>
        <button type="submit" className={css.formBtn}>
          Log In
        </button>
        {isError && <p className={css.errorMessage}>Password is incorrect</p>}
      </Form>
    </Formik>
  );
};

export default LoginForm;