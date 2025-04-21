
import React from 'react';
import MainLayout from '@/layouts/MainLayout';

const ChatbotPage = () => (
  <MainLayout>
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-3xl font-bold mb-4 text-glow">KnightSpeak Chatbot 🤖</h2>
      <div className="max-w-lg w-full">
        <p className="mb-2 text-muted-foreground text-center">Ask me anything about chess!</p>
        <div className="rounded-lg border bg-background p-6 flex flex-col gap-3 items-center justify-center">
          {/* Placeholder for actual chatbot interaction */}
          <span className="text-gray-400">Chatbot coming soon!</span>
        </div>
      </div>
    </div>
  </MainLayout>
);

export default ChatbotPage;
