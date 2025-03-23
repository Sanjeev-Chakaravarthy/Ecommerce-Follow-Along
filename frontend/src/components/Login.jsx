import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from 'react-icons/fa';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if there's saved credentials
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            setFormData(prev => ({ ...prev, email: savedEmail }));
            setRememberMe(true);
        }
    }, []);

    const validateForm = () => {
        const newErrors = {};
        
        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        
        // Clear specific error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Handle "Remember me" functionality
        if (rememberMe) {
            localStorage.setItem('savedEmail', formData.email);
        } else {
            localStorage.removeItem('savedEmail');
        }
        
        setIsLoading(true);
        
        try {
            const response = await axios.post('/api/auth/login', formData);
            
            // Store token in localStorage or secure cookie
            localStorage.setItem('token', response.data.token);
            
            // Set authorization header for future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            
            // Redirect to dashboard or homepage
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            
            if (error.response) {
                // Server responded with an error
                setLoginError(error.response.data.message || 'Invalid email or password');
            } else if (error.request) {
                // No response received
                setLoginError('Network error. Please try again later.');
            } else {
                // Something else went wrong
                setLoginError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <Title>Welcome Back</Title>
                <Subtitle>Login to access your account</Subtitle>
                
                {loginError && <AlertMessage>{loginError}</AlertMessage>}
                
                <InputGroup>
                    <Label htmlFor="email">Email</Label>
                    <InputWrapper>
                        <IconContainer>
                            <FaEnvelope />
                        </IconContainer>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            hasError={!!errors.email}
                            autoComplete="email"
                        />
                    </InputWrapper>
                    {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </InputGroup>
                
                <InputGroup>
                    <Label htmlFor="password">Password</Label>
                    <InputWrapper>
                        <IconContainer>
                            <FaLock />
                        </IconContainer>
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            hasError={!!errors.password}
                            autoComplete="current-password"
                        />
                        <PasswordToggle 
                            type="button" 
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </PasswordToggle>
                    </InputWrapper>
                    {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                </InputGroup>
                
                <FormOptions>
                    <CheckboxContainer>
                        <Checkbox
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        <CheckboxLabel htmlFor="rememberMe">Remember me</CheckboxLabel>
                    </CheckboxContainer>
                    <ForgotPassword to="/forgot-password">Forgot password?</ForgotPassword>
                </FormOptions>
                
                <Button 
                    type="submit" 
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Log In'}
                </Button>
                
                <SignupPrompt>
                    Don't have an account? <SignupLink to="/register">Sign up</SignupLink>
                </SignupPrompt>
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
    background-color: var(--background-color, #f5f8fa);
    padding: 20px;
    color: var(--font-color, #333);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    background: var(--secondary-color, #ffffff);
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    
    &:hover {
        transform: translateY(-5px);
    }
`;

const Title = styled.h1`
    margin-bottom: 10px;
    text-align: center;
    color: var(--primary-color, #2e7d32);
    font-size: 28px;
    font-weight: 700;
`;

const Subtitle = styled.p`
    text-align: center;
    color: #666;
    margin-bottom: 30px;
    font-size: 16px;
`;

const InputGroup = styled.div`
    margin-bottom: 20px;
    width: 100%;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #333;
    font-size: 14px;
`;

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const IconContainer = styled.div`
    position: absolute;
    left: 12px;
    color: #666;
    font-size: 16px;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 40px;
    font-size: 16px;
    border: 2px solid ${props => props.hasError ? 'var(--error-color, #d32f2f)' : '#e0e0e0'};
    border-radius: 8px;
    outline: none;
    transition: all 0.3s ease;
    
    &:focus {
        border-color: ${props => props.hasError ? 'var(--error-color, #d32f2f)' : 'var(--primary-color, #2e7d32)'};
        box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(211, 47, 47, 0.2)' : 'rgba(46, 125, 50, 0.2)'};
    }
    
    &::placeholder {
        color: #aaa;
    }
`;

const PasswordToggle = styled.button`
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        color: var(--primary-color, #2e7d32);
    }
`;

const Button = styled.button`
    padding: 14px;
    font-size: 16px;
    font-weight: 600;
    color: white;
    background-color: var(--primary-color, #2e7d32);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: #1b5e20;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
    }
    
    &:active {
        transform: translateY(0);
    }
    
    &:disabled {
        background-color: #a5d6a7;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
`;

const ErrorMessage = styled.p`
    color: var(--error-color, #d32f2f);
    font-size: 13px;
    margin-top: 4px;
    font-weight: 500;
`;

const AlertMessage = styled.div`
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border-radius: 4px;
    background-color: #ffebee;
    color: #c62828;
    font-size: 14px;
    text-align: center;
    border-left: 4px solid #c62828;
`;

const FormOptions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Checkbox = styled.input`
    margin-right: 8px;
    cursor: pointer;
`;

const CheckboxLabel = styled.label`
    font-size: 14px;
    color: #555;
    cursor: pointer;
`;

const ForgotPassword = styled(Link)`
    font-size: 14px;
    color: var(--primary-color, #2e7d32);
    text-decoration: none;
    
    &:hover {
        text-decoration: underline;
    }
`;

const SignupPrompt = styled.p`
    text-align: center;
    margin-top: 20px;
    color: #555;
    font-size: 14px;
`;

const SignupLink = styled(Link)`
    color: var(--primary-color, #2e7d32);
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
        text-decoration: underline;
    }
`;

export default Login;