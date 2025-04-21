import React from 'react';
import MainLayout from '@/layouts/MainLayout';

const ProfilePage = () => (
  <MainLayout>
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-3xl font-bold mb-2 text-glow">Profile</h2>
      <span className="text-muted-foreground mb-2">View and update your chess profile.</span>
      <div className="rounded-lg border bg-background p-6">
        <span className="text-gray-400">Profile details coming soon!</span>
      </div>
    </div>
  </MainLayout>
);

export default ProfilePage;
