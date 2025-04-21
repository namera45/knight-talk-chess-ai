
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import MainLayout from '@/layouts/MainLayout';
import { MessageSquareIcon, ArrowRightIcon, SearchIcon } from 'lucide-react';

const ChatbotPage = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Hi, I\'m KnightSpeak! Ask me anything about chess strategies, openings, famous games, or players.' },
  ]);
  const [loading, setLoading] = useState(false);

  // Mocked responses for demo purposes
  const mockResponses = {
    "openings": "There are many popular chess openings including the Sicilian Defense, Ruy Lopez, Queen's Gambit, and King's Indian Defense. Each has its own strategic ideas and variations.",
    "best move": "The best move depends on your position! If you share a FEN notation or describe the board, I can analyze it for you.",
    "magnus": "Magnus Carlsen is a Norwegian chess grandmaster who has been World Chess Champion since 2013. He's known for his exceptional endgame technique and positional understanding.",
    "improve": "To improve at chess: 1) Study tactics, 2) Analyze your games, 3) Learn basic endgames, 4) Play regularly, and 5) Review games of stronger players."
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, { sender: 'user', text: message }]);
    
    // Clear input
    setMessage("");
    
    // Simulate AI thinking
    setLoading(true);
    
    setTimeout(() => {
      // Mock response logic
      let botResponse = "I'm not sure about that. Could you ask me about chess openings, strategies, or famous players?";
      
      // Simple keyword matching for demo
      const lowercaseMessage = message.toLowerCase();
      if (lowercaseMessage.includes("opening")) {
        botResponse = mockResponses.openings;
      } else if (lowercaseMessage.includes("best move")) {
        botResponse = mockResponses["best move"];
      } else if (lowercaseMessage.includes("magnus") || lowercaseMessage.includes("carlsen")) {
        botResponse = mockResponses.magnus;
      } else if (lowercaseMessage.includes("improve") || lowercaseMessage.includes("better")) {
        botResponse = mockResponses.improve;
      }
      
      // Add bot response to chat
      setChatHistory(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex flex-col items-center justify-center mb-6">
          <h2 className="text-3xl font-bold text-glow">KnightSpeak Chatbot</h2>
          <span className="text-muted-foreground">Your AI chess assistant</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar with suggestions */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SearchIcon className="h-5 w-5" />
                Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-left" onClick={() => setMessage("What's the Sicilian Defense?")}>
                What's the Sicilian Defense?
              </Button>
              <Button variant="ghost" className="w-full justify-start text-left" onClick={() => setMessage("Who is the current world chess champion?")}>
                Who is the current world champion?
              </Button>
              <Button variant="ghost" className="w-full justify-start text-left" onClick={() => setMessage("How to improve my endgame?")}>
                How to improve my endgame?
              </Button>
              <Button variant="ghost" className="w-full justify-start text-left" onClick={() => setMessage("Explain the Queen's Gambit")}>
                Explain the Queen's Gambit
              </Button>
              
              <Separator className="my-2" />
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Popular Topics</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Openings</Button>
                  <Button variant="outline" size="sm">Tactics</Button>
                  <Button variant="outline" size="sm">Endgames</Button>
                  <Button variant="outline" size="sm">Famous Games</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat main area */}
          <Card className="md:col-span-3 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <MessageSquareIcon className="h-5 w-5" />
                KnightSpeak Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              {/* Chat messages */}
              <div className="flex-grow border rounded-md p-4 overflow-y-auto space-y-4 min-h-[400px] max-h-[400px] mb-4">
                {chatHistory.map((chat, index) => (
                  <div 
                    key={index}
                    className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        chat.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      {chat.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-muted">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Message input */}
              <div className="flex">
                <Textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about chess strategies, openings, or famous players..."
                  className="flex-grow resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={handleSendMessage} 
                  className="ml-2 self-end"
                  disabled={!message.trim() || loading}
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatbotPage;
