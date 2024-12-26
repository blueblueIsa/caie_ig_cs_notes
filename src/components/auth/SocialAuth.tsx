import { Button } from '../ui/Button';
import { Github } from 'lucide-react';

export function SocialAuth() {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {/* TODO: Implement GitHub auth */}}
        >
          <Github className="h-5 w-5 mr-2" />
          GitHub
        </Button>
      </div>
    </div>
  );
}