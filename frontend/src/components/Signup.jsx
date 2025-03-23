import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        avatar: null
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Clear error when field is edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                avatar: file
            });
            setErrors({
                ...errors,
                avatar: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        if (!formData.avatar) {
            newErrors.avatar = 'Please upload a profile picture';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('email', formData.email);
        submitData.append('password', formData.password);
        submitData.append('file', formData.avatar);

        try {
            const response = await axios.post('http://localhost:6000/api/auth/create-user', submitData);
            navigate('/login', { state: { message: 'Account created successfully. Please log in.' } });
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred during registration.';
            setErrors({ submit: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit} noValidate>
                <Title>Create Account</Title>
                
                {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
                
                <FormGroup>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        aria-invalid={!!errors.name}
                        hasError={!!errors.name}
                    />
                    {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        aria-invalid={!!errors.email}
                        hasError={!!errors.email}
                    />
                    {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        aria-invalid={!!errors.password}
                        hasError={!!errors.password}
                    />
                    {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                    <Label htmlFor="avatar">Profile Picture</Label>
                    <FileInput
                        id="avatar"
                        name="avatar"
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        hasError={!!errors.avatar}
                    />
                    {errors.avatar && <ErrorMessage>{errors.avatar}</ErrorMessage>}
                </FormGroup>
                
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
                
                <LoginLink>
                    Already have an account? <LinkButton onClick={() => navigate('/login')}>Log in</LinkButton>
                </LoginLink>
            </Form>
        </FormContainer>
    );
};

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: var(--background-color);
    padding: 20px;
    color: var(--font-color);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    background: var(--secondary-color);
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border-color, #e0e0e0);
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
`;

const Input = styled.input`
    padding: 12px;
    font-size: 16px;
    border: 1px solid ${props => props.hasError ? '#e53935' : '#ccc'};
    border-radius: 5px;
    background-color: ${props => props.hasError ? '#ffebee' : 'white'};
    outline: none;
    transition: all 0.2s ease;
    
    &:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 5px rgba(1, 117, 38, 0.2);
    }
`;

const FileInput = styled.input`
    padding: 8px 0;
    font-size: 16px;
    border: ${props => props.hasError ? '1px solid #e53935' : 'none'};
    border-radius: ${props => props.hasError ? '5px' : '0'};
    background-color: ${props => props.hasError ? '#ffebee' : 'transparent'};
    padding: ${props => props.hasError ? '12px' : '8px 0'};
`;

const Label = styled.label`
    margin-bottom: 8px;
    font-weight: 600;
    color: #333;
    font-size: 14px;
`;

const Button = styled.button`
    padding: 12px 15px;
    font-size: 16px;
    font-weight: 600;
    color: white;
    background-color: var(--primary-color);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover:not(:disabled) {
        background-color: #578e7ecf;
    }
    
    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

const Title = styled.h1`
    margin-bottom: 24px;
    text-align: center;
    color: #333;
    font-size: 24px;
`;

const ErrorMessage = styled.p`
    color: #e53935;
    font-size: 14px;
    margin-top: 4px;
    margin-bottom: 0;
`;

const LoginLink = styled.div`
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    color: #666;
`;

const LinkButton = styled.button`
    background: none;
    border: none;
    color: var(--primary-color);
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    font-size: 14px;
    
    &:hover {
        text-decoration: underline;
    }
`;

export default Signup;