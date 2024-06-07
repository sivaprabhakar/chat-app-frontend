import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PiUserCircle } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../Redux/UserSlice';

const CheckEmail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
       

            // Check the email
            const emailResponse = await axios.post('/api/email', { email: values.email });
       

            if (emailResponse.data.success) {
                // Check the password
                const passwordResponse = await axios.post('/api/password', { userId: emailResponse.data.data._id, password: values.password });
              

                if (passwordResponse.data.success) {
                    toast.success('Login successful!');
                    dispatch(setToken(passwordResponse.data.token));
                    localStorage.setItem('token', passwordResponse.data.token);
                
                    // Set user details in Redux store
                    const userData = emailResponse.data.data;
                    dispatch(setUser(userData));
                
                    resetForm();
                    navigate('/');
                } else {
                    toast.error(passwordResponse.data.message);
                }
                
            } else {
                toast.error(emailResponse.data.message);
            }
        } catch (error) {
            console.error('API Error:', error);
            toast.error(error?.response?.data?.message || 'An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white w-full max-w-md rounded-lg shadow-md mb-20 p-8 mx-auto">
                <div className='w-fit mx-auto mb-2'>
                    <PiUserCircle size={80} />
                </div>
                <h3 className="text-2xl font-semibold text-center">Welcome Back!</h3>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="grid gap-4 mt-2">
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
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="my-3 text-center">
                    Don't have an account? <Link to="/register" className="hover:text-primary font-semibold">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default CheckEmail;
