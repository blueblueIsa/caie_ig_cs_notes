import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { RegisterForm } from '../components/auth/RegisterForm';
import { RegisterFormData } from '../types/auth';

export const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (data: RegisterFormData) => {
    try { 
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

      if (error) throw error;

      navigate('/login', { 
        state: { message: 'Please check your email to verify your account' }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <RegisterForm handleRegister={handleSignUp} />
      </div>
    </div>
  );
} 