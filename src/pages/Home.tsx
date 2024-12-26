import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { Book } from 'lucide-react';

export function Home() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex min-h-screen">
        {/* Left side - Hero section */}
        <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 items-center justify-center">
          <div className="max-w-lg">
            <div className="flex items-center space-x-3 mb-8">
              <Book className="h-12 w-12 text-white" />
              <h1 className="text-4xl font-bold text-white">CAIE Computer Science</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Master your Computer Science journey with our comprehensive IGCSE learning platform.
              Join thousands of students preparing for their CAIE examinations.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-500/20 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-2">Structured Learning</h3>
                <p className="text-blue-100">Follow a carefully crafted curriculum aligned with CAIE requirements</p>
              </div>
              <div className="bg-blue-500/20 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-2">Interactive Practice</h3>
                <p className="text-blue-100">Engage with hands-on coding exercises and real-world examples</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Tab buttons */}
            <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1 mb-8">
              <button
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'login'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
                onClick={() => setActiveTab('login')}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'register'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
                onClick={() => setActiveTab('register')}
              >
                Register
              </button>
            </div>

            {/* Form container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}