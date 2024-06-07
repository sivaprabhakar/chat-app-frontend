import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('/api/register', values);
      toast.success(response.data.message);

      if (response.data.success) {
        resetForm();
        navigate('/email');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-lg shadow-md p-8 mx-auto mb-20"> {/* Adjusted margin-top */}
        <h3 className="text-2xl font-semibold text-center">Welcome to Chat App!</h3>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid gap-4 mt-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="font-medium">Name:</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="bg-gray-100 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-medium">Email:</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="bg-gray-100 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="font-medium">Password:</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="bg-gray-100 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                className="bg-primary text-lg px-4 py-2 rounded text-white hover:bg-secondary mt-4 font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </Form>
          )}
        </Formik>

        <p className="my-3 text-center">
          Already have an account? <Link to="/email" className="hover:text-primary font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
