import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, ChevronRight, Github, Mail, User, Code, HelpCircle, X, Bot, MessageCircle } from 'lucide-react';
import { useAIChat } from '../hooks/useAIChat';

interface Command {
  name: string;
  description: string;
  action: () => void;
  icon?: React.ComponentType<any>;
}

const InteractiveTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: string; timestamp: Date }>>([]);
  const [currentPath] = useState('~/portfolio');
  const [mode, setMode] = useState<'terminal' | 'chat'>('terminal');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // AI Chat hook
  const { messages, isLoading, error, sendMessage } = useAIChat();

  const commands: Command[] = [
    {
      name: 'help',
      description: 'Show available commands',
      action: () => addToHistory('help', getHelpOutput()),
      icon: HelpCircle
    },
    {
      name: 'about',
      description: 'Show information about Nicolas',
      action: () => addToHistory('about', getAboutOutput()),
      icon: User
    },
    {
      name: 'projects',
      description: 'List all projects',
      action: () => addToHistory('projects', getProjectsOutput()),
      icon: Code
    },
    {
      name: 'github',
      description: 'Open GitHub profile',
      action: () => {
        addToHistory('github', 'Opening GitHub profile...');
        window.open('https://github.com/nicolas-netizen', '_blank');
      },
      icon: Github
    },
    {
      name: 'contact',
      description: 'Show contact information',
      action: () => addToHistory('contact', getContactOutput()),
      icon: Mail
    },
    {
      name: 'clear',
      description: 'Clear terminal history',
      action: () => setHistory([])
    },
    {
      name: 'whoami',
      description: 'Show current user',
      action: () => addToHistory('whoami', 'nicolas-netizen')
    },
    {
      name: 'pwd',
      description: 'Print working directory',
      action: () => addToHistory('pwd', currentPath)
    },
    {
      name: 'ls',
      description: 'List directory contents',
      action: () => addToHistory('ls', 'about  projects  skills  contact  github  resume.pdf')
    },
    {
      name: 'date',
      description: 'Show current date and time',
      action: () => addToHistory('date', new Date().toString())
    },
    {
      name: 'chat',
      description: 'Switch to AI chat mode 🤖',
      action: () => {
        addToHistory('chat', 'Switching to AI chat mode...');
        setMode('chat');
      },
      icon: Bot
    },
    {
      name: 'terminal',
      description: 'Switch to terminal mode',
      action: () => {
        addToHistory('terminal', 'Switching to terminal mode...');
        setMode('terminal');
      },
      icon: Terminal
    }
  ];

  const addToHistory = (command: string, output: string) => {
    setHistory(prev => [...prev, { command, output, timestamp: new Date() }]);
  };

  const getHelpOutput = () => {
    return `Available commands:
${commands.map(cmd => `  ${cmd.name.padEnd(12)} - ${cmd.description}`).join('\n')}

Type any command and press Enter to execute.`;
  };

  const getAboutOutput = () => {
    return `Nicolas Paniagua - Full Stack Developer

🚀 Passionate about creating efficient and innovative digital solutions
💻 Experience with modern web technologies in frontend and backend
☁️  Knowledge in infrastructure, databases, and cloud deployment
🎯 Focus on delivering quality and scalable products

Skills: React, TypeScript, Node.js, Python, C#, Flutter, MongoDB
Location: Argentina
Status: Available for opportunities`;
  };

  const getProjectsOutput = () => {
    return `Recent Projects:

1. Juntea - Events App (Flutter, Dart)
   Mobile application for event management

2. Chapiri - E-commerce Platform (React, Node.js, MongoDB)
   Full-stack e-commerce solution

3. Goblin Attack - Unity Game (C#, Unity)
   2D platformer game with advanced mechanics

4. Portfolio Website (React, TypeScript, Tailwind)
   This interactive portfolio you're using right now!

5. Nuevo Mundo E-commerce (React, Express, MongoDB)
   Solar energy products e-commerce platform

Type 'github' to view all repositories on GitHub.`;
  };

  const getContactOutput = () => {
    return `Contact Information:

📧 Email: nicolas.paniagua05f@gmail.com
💼 LinkedIn: linkedin.com/in/nicolas-paniagua-80150a256
🐙 GitHub: github.com/nicolas-netizen
📍 Location: Argentina

Feel free to reach out for collaborations or opportunities!`;
  };

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    const foundCommand = commands.find(cmd => cmd.name === trimmedCommand);
    
    if (foundCommand) {
      foundCommand.action();
    } else if (trimmedCommand === '') {
      addToHistory('', '');
    } else {
      addToHistory(command, `Command not found: ${command}. Type 'help' for available commands.`);
    }
  };

  const handleChatMessage = async (message: string) => {
    if (message.trim()) {
      await sendMessage(message);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (mode === 'chat') {
        handleChatMessage(input);
        setInput('');
      } else {
        executeCommand(input);
        setInput('');
      }
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group relative flex items-center justify-center border-2 border-emerald-400 hover:border-emerald-300 ring-2 ring-emerald-300/50 hover:ring-emerald-200/70"
        style={{
          position: 'fixed',
          bottom: '12px',
          right: '12px',
          zIndex: 9998,
          width: '56px',
          height: '56px',
          maxWidth: '56px',
          maxHeight: '56px',
          display: 'block',
          visibility: 'visible',
          opacity: 1,
        }}
        data-terminal-button
      >
        <Terminal size={26} className="text-white drop-shadow-lg" />
        {/* AI Chat Indicator */}
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-lg border-2 border-white">
          <Bot size={14} className="text-white" />
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
          Terminal + AI Chat 🤖
        </div>
      </button>
    );
  }

  return (
    <motion.div
      className="fixed bottom-12 right-6 sm:bottom-12 sm:right-8 w-[calc(100vw-2rem)] sm:w-96 h-80 sm:h-80 bg-gray-900 rounded-lg shadow-2xl z-[70] flex flex-col max-w-sm sm:max-w-none terminal-open"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-800 rounded-t-lg">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-xs sm:text-sm text-gray-300 ml-1 sm:ml-2">
            {mode === 'chat' ? 'AI Chat' : 'Terminal'}
          </span>
          {mode === 'chat' ? (
            <Bot size={12} className="sm:w-4 sm:h-4 text-blue-400" />
          ) : (
            <div className="flex items-center gap-1">
              <MessageCircle size={12} className="sm:w-4 sm:h-4 text-green-400" />
              <span className="text-xs text-green-400">AI Available</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode(mode === 'chat' ? 'terminal' : 'chat')}
            className="text-gray-400 hover:text-white transition-colors p-1"
            title={`Switch to ${mode === 'chat' ? 'terminal' : 'chat'} mode`}
          >
            {mode === 'chat' ? <Terminal size={14} className="sm:w-4 sm:h-4" /> : <MessageCircle size={14} className="sm:w-4 sm:h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="flex-1 p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-y-auto bg-black"
      >
        {mode === 'terminal' ? (
          <>
            <div className="mb-1 sm:mb-2">
              <span className="text-blue-400 text-xs sm:text-sm">Welcome to Nicolas's Interactive Terminal!</span>
            </div>
            <div className="mb-1 sm:mb-2">
              <span className="text-yellow-400 text-xs sm:text-sm">Type 'help' to see available commands or</span>
            </div>
            <div className="mb-1 sm:mb-2">
              <span className="text-green-400 text-xs sm:text-sm font-bold">'chat' for AI mode 🤖</span>
            </div>
            <div className="mb-1 sm:mb-2">
              <span className="text-purple-400 text-xs sm:text-sm">💬 Ask me anything about Nicolas's work!</span>
            </div>
            
            <AnimatePresence>
              {history.map((entry, index) => (
                <motion.div
                  key={index}
                  className="mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {entry.command && (
                    <div className="flex items-center gap-1 sm:gap-2 mb-1">
                      <span className="text-blue-400 text-xs sm:text-sm">{currentPath}</span>
                      <ChevronRight size={12} className="sm:w-3 sm:h-3" />
                      <span className="text-white text-xs sm:text-sm">{entry.command}</span>
                    </div>
                  )}
                  {entry.output && (
                    <div className="text-gray-300 whitespace-pre-line ml-2 sm:ml-4 mb-1 sm:mb-2 text-xs sm:text-sm">
                      {entry.output}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Current Input Line */}
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-blue-400 text-xs sm:text-sm">{currentPath}</span>
              <ChevronRight size={12} className="sm:w-3 sm:h-3" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent text-white outline-none text-xs sm:text-sm"
                placeholder="Type a command..."
                autoFocus
              />
            </div>
          </>
        ) : (
          <>
            {/* AI Chat Mode */}
            <div className="mb-2">
              <span className="text-blue-400 text-xs sm:text-sm">🤖 AI Assistant - Ask me anything about Nicolas!</span>
            </div>
            
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className="mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className={`flex items-start gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.role === 'assistant' && (
                      <Bot size={14} className="text-blue-400 mt-1 flex-shrink-0" />
                    )}
                    <div
                      className={`max-w-[80%] p-2 rounded-lg text-xs sm:text-sm ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-200'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                    {message.role === 'user' && (
                      <User size={14} className="text-green-400 mt-1 flex-shrink-0" />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                className="flex items-center gap-2 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Bot size={14} className="text-blue-400" />
                <div className="bg-gray-700 p-2 rounded-lg">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                className="bg-red-900 text-red-200 p-2 rounded-lg mb-3 text-xs sm:text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            {/* Chat Input */}
            <div className="flex items-center gap-2">
              <span className="text-blue-400 text-xs sm:text-sm">You:</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent text-white outline-none text-xs sm:text-sm border-b border-gray-600 focus:border-blue-400"
                placeholder="Ask me anything about Nicolas..."
                autoFocus
                disabled={isLoading}
              />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default InteractiveTerminal;
