
import React from 'react';
import MainLayout from '@/layouts/MainLayout';

const SettingsPage = () => (
  <MainLayout>
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-3xl font-bold mb-2 text-glow">Settings</h2>
      <span className="text-muted-foreground mb-2">Adjust your app preferences.</span>
      {/* Placeholder for settings */}
      <div className="rounded-lg border bg-background p-6">
        <span className="text-gray-400">Settings coming soon!</span>
      </div>
    </div>
  </MainLayout>
);

export default SettingsPage;
