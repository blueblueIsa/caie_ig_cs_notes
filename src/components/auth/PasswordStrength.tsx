interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  return (
    <div className="mt-1">
      <div className="flex h-2 gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-full flex-1 rounded-full transition-colors ${
              level <= strength
                ? level <= 2
                  ? 'bg-red-500'
                  : level <= 4
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {strength === 0 && 'Enter a password'}
        {strength === 1 && 'Very weak'}
        {strength === 2 && 'Weak'}
        {strength === 3 && 'Medium'}
        {strength === 4 && 'Strong'}
        {strength === 5 && 'Very strong'}
      </p>
    </div>
  );
}