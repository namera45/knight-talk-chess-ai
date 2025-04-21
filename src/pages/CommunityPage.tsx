
import React from 'react';
import MainLayout from '@/layouts/MainLayout';

const CommunityPage = () => (
  <MainLayout>
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-3xl font-bold mb-2 text-glow">Community</h2>
      <span className="text-muted-foreground mb-2">Connect with fellow chess enthusiasts!</span>
      {/* Placeholder for community features */}
      <div className="rounded-lg border bg-background p-6">
        <span className="text-gray-400">Community features coming soon!</span>
      </div>
    </div>
  </MainLayout>
);

export default CommunityPage;
