
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Trophy, MessageSquare } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';

const CommunityPage = () => {
  // Mock data for the community page
  const topPlayers = [
    { rank: 1, username: "GrandMaster1", rating: 2450, wins: 142 },
    { rank: 2, username: "ChessWizard", rating: 2380, wins: 128 },
    { rank: 3, username: "KnightRider", rating: 2350, wins: 115 },
  ];

  const recentDiscussions = [
    { title: "Queen's Gambit Strategy", author: "ChessPro", replies: 23, views: 156 },
    { title: "Best Opening for Beginners", author: "NewPlayer", replies: 45, views: 289 },
    { title: "Advanced Endgame Techniques", author: "MasterClass", replies: 12, views: 98 },
  ];

  return (
    <MainLayout>
      <div className="container py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-glow">Community</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Rank</TableHead>
                      <TableHead>Player</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Wins</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPlayers.map((player) => (
                      <TableRow key={player.rank}>
                        <TableCell className="font-medium">{player.rank}</TableCell>
                        <TableCell>{player.username}</TableCell>
                        <TableCell>{player.rating}</TableCell>
                        <TableCell>{player.wins}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Active Players */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Active Players
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center space-x-4 bg-muted p-3 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">Player {i}</div>
                        <div className="text-sm text-muted-foreground">Online</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Discussion Forums */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Recent Discussions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Topic</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Replies</TableHead>
                      <TableHead>Views</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentDiscussions.map((discussion, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{discussion.title}</TableCell>
                        <TableCell>{discussion.author}</TableCell>
                        <TableCell>{discussion.replies}</TableCell>
                        <TableCell>{discussion.views}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default CommunityPage;
