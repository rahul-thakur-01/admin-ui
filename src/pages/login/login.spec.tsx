import {describe,expect,it} from 'vitest';
import {render, screen} from '@testing-library/react'
import LoginPage from './login';
import '@testing-library/jest-dom';

describe('Login Page', () => {
    it('should render a login form', () => {
        render(<LoginPage />)
        // getBy -> throw error if not found, use for positive test
        // queryBy -> return null if not found, used for negative test
        // findBy -> return promise (async function),used for async test
        expect(screen.getByText(/login/)).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(screen.getByRole('button', {name: "Log in"})).toBeInTheDocument()
        expect(screen.getByRole('checkbox', {name: "Remember me"})).toBeInTheDocument()
        expect(screen.getByText('Forget password')).toBeInTheDocument()
    });
});