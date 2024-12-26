import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { PasswordInput } from './PasswordInput';
import { PasswordStrength } from './PasswordStrength';
import { SocialAuth } from './SocialAuth';
import { RegisterFormData, registerSchema } from '../../types/auth';
import { useState, useEffect } from 'react';

interface RegisterFormProps {
  handleRegister: (email: string, password: string, fullName: string) => Promise<void>;
}

export const RegisterForm = ({ handleRegister }: RegisterFormProps) => {
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
      await handleRegister(data.email, data.password, data.fullName);
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
};