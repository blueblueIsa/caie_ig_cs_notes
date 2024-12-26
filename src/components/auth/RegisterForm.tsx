import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { PasswordInput } from './PasswordInput';
import { PasswordStrength } from './PasswordStrength';
import { SocialAuth } from './SocialAuth';
import { RegisterFormData, registerSchema } from '../../types/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export function RegisterForm() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.password) setPassword(value.password);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      });

      if (signUpError) throw signUpError;

      navigate('/dashboard');
    } catch (err) {
      setError('An error occurred during registration');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200">
          {error}
        </div>
      )}

      <Input
        label="Full name"
        autoComplete="name"
        {...register('fullName')}
        error={errors.fullName?.message}
      />

      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <div className="space-y-1">
        <PasswordInput
          label="Password"
          autoComplete="new-password"
          {...register('password')}
          error={errors.password?.message}
        />
        <PasswordStrength password={password} />
      </div>

      <PasswordInput
        label="Confirm password"
        autoComplete="new-password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

      <label className="flex items-start space-x-3">
        <input
          type="checkbox"
          className="mt-1 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          {...register('terms')}
        />
        <span className="text-sm text-gray-600 dark:text-gray-300">
          I agree to the{' '}
          <a href="/terms" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Privacy Policy
          </a>
        </span>
      </label>
      {errors.terms && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
          {errors.terms.message}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
      >
        Create account
      </Button>

      <SocialAuth />
    </form>
  );
}