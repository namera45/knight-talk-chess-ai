
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MainLayout from '@/layouts/MainLayout';
import { UserIcon } from 'lucide-react';

const ProfilePage = () => {
  // Mock user data - in a real app this would come from authentication
  const user = {
    username: "GrandMaster1",
    email: "chess@example.com",
    rating: 1450,
    joinDate: "January 15, 2023",
    gamesPlayed: 124,
    wins: 68,
    losses: 42,
    draws: 14
  };

  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-glow">Your Profile</h2>
          <span className="text-muted-foreground mb-6">View and update your chess profile</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold">{user.username.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold">{user.username}</h3>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating:</span>
                  <span className="font-medium">{user.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Joined:</span>
                  <span className="font-medium">{user.joinDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats & Progress */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Games Played</h4>
                  <p className="text-3xl font-bold">{user.gamesPlayed}</p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Win Rate</h4>
                  <p className="text-3xl font-bold">{Math.round((user.wins / user.gamesPlayed) * 100)}%</p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Record</h4>
                  <p className="text-lg">
                    <span className="text-green-500">{user.wins}W</span> / 
                    <span className="text-red-500">{user.losses}L</span> / 
                    <span className="text-yellow-500">{user.draws}D</span>
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Average Accuracy</h4>
                  <p className="text-3xl font-bold">86%</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Rating History</h4>
                <div className="h-32 bg-background/50 rounded-lg p-4 flex items-center justify-center">
                  <span className="text-muted-foreground">Rating history chart will appear here</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Games */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Recent Games</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium border-b">
                  <div>Date</div>
                  <div>Opponent</div>
                  <div>Result</div>
                  <div>Rating Change</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {[1, 2, 3].map((game) => (
                    <div key={game} className="grid grid-cols-5 p-4">
                      <div className="text-muted-foreground">Apr 12, 2025</div>
                      <div>ChessMaster321</div>
                      <div className="font-medium text-green-500">Win</div>
                      <div className="font-medium text-green-500">+8</div>
                      <div className="text-right">
                        <button className="text-primary hover:underline">View</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
