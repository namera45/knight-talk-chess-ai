
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your chess assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I'd recommend studying the Sicilian Defense to improve your opening game.",
        "Your question about the Queen's Gambit is interesting. This opening is excellent for controlling the center.",
        "For beginners, I suggest practicing endgames with king and pawn vs king scenarios.",
        "The Ruy Lopez is one of the oldest and most respected openings in chess history.",
        "To improve your tactics, try solving daily puzzles focused on forks and pins.",
        "Remember that controlling the center is crucial in the opening phase.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h1 className="text-2xl font-bold text-glow">Chess Assistant</h1>

        <Card className="neo-blur h-[70vh] flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Chat with our AI Chess Coach</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={cn(
                    "flex",
                    message.sender === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div 
                    className={cn(
                      "max-w-[80%] p-3 rounded-lg",
                      message.sender === 'user' 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-black/20 border border-white/10"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === 'bot' && (
                        <Avatar className="h-6 w-6">
                          <AvatarImage 
                            src="/lovable-uploads/55d3a5c9-2dfb-42a3-a1d4-de16ea2c7b2c.png" 
                            alt="Chess Assistant"
                          />
                          <AvatarFallback>CA</AvatarFallback>
                        </Avatar>
                      )}
                      <span className="text-xs">
                        {message.sender === 'user' ? 'You' : 'Chess Coach'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Textarea 
                placeholder="Ask about chess strategies, openings, or general advice..." 
                className="resize-none bg-black/20 border-white/10"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <Button 
                className="shrink-0" 
                size="icon"
                onClick={handleSend}
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </MainLayout>
  );
};

export default ChatbotPage;
