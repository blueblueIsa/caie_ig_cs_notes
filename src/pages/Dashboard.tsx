import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Topic {
  id: string;
  title: string;
  subtopics: string[];
  progress: number;
}

const topics: Topic[] = [
  {
    id: 'theory',
    title: 'Theory Fundamentals',
    subtopics: ['Binary Systems', 'Data Types', 'Boolean Logic'],
    progress: 0,
  },
  {
    id: 'algorithms',
    title: 'Algorithms, Programming and Logic',
    subtopics: ['Pseudocode', 'Flow Charts', 'Basic Programming Concepts'],
    progress: 0,
  },
  // Add other topics similarly
];

export function Dashboard() {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          CAIE Computer Science Curriculum
        </h1>
        
        <div className="grid gap-6">
          {topics.map((topic) => (
            <motion.div
              key={topic.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button
                className="w-full p-4 flex items-center justify-between text-left"
                onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {topic.title}
                  </h2>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${topic.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className={`transform transition-transform ${
                    expandedTopic === topic.id ? 'rotate-90' : ''
                  }`}
                />
              </button>
              
              {expandedTopic === topic.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="px-4 pb-4"
                >
                  <ul className="space-y-2">
                    {topic.subtopics.map((subtopic, index) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                      >
                        {subtopic}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}