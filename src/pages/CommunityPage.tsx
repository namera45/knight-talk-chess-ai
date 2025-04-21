
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import MainLayout from '@/layouts/MainLayout';
import { UsersIcon, SearchIcon, CalendarIcon } from 'lucide-react';

const CommunityPage = () => {
  // Mock data for community page
  const leaderboardUsers = [
    { id: 1, username: "MagnusFan99", rating: 2350, rank: 1, country: "Norway", winRate: "68%" },
    { id: 2, username: "Queen's Gambit", rating: 2210, rank: 2, country: "USA", winRate: "65%" },
    { id: 3, username: "KnightRider", rating: 2180, rank: 3, country: "Germany", winRate: "62%" },
    { id: 4, username: "ChessMaster2000", rating: 2100, rank: 4, country: "Russia", winRate: "60%" },
    { id: 5, username: "PawnStars", rating: 2050, rank: 5, country: "India", winRate: "58%" },
  ];
  
  const tournaments = [
    { id: 1, name: "Weekend Blitz Championship", date: "Apr 24, 2025", players: 64, status: "Registration Open" },
    { id: 2, name: "Grandmaster Invitational", date: "May 5, 2025", players: 16, status: "Upcoming" },
    { id: 3, name: "Beginner's Monthly Tournament", date: "Apr 30, 2025", players: 32, status: "Registration Open" },
  ];
  
  const forumTopics = [
    { id: 1, title: "Best response to Sicilian Defense?", author: "ChessMaster2000", replies: 24, lastActive: "2 hours ago" },
    { id: 2, title: "Analysis of Carlsen vs Nepo 2023", author: "GrandmasterJ", replies: 18, lastActive: "5 hours ago" },
    { id: 3, title: "Tips for improving calculation abilities", author: "TacticsKing", replies: 32, lastActive: "Yesterday" },
    { id: 4, title: "Your favorite chess books?", author: "BookWorm", replies: 45, lastActive: "2 days ago" },
  ];

  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-glow">Chess Community</h2>
          <span className="text-muted-foreground mb-6">Connect with fellow chess enthusiasts</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Find Players Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5" />
                Find Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex mb-4">
                <div className="relative w-full">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by username or rating..."
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((player) => (
                  <div key={player} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{`P${player}`}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">RandomPlayer{player}</p>
                        <p className="text-xs text-muted-foreground">Rating: {1200 + player * 100}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Challenge</Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="link" size="sm">View More</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Tabs Container for Leaderboard/Tournaments/Forum */}
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <Tabs defaultValue="leaderboard">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                  <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
                  <TabsTrigger value="forum">Forum</TabsTrigger>
                </TabsList>
                
                {/* Leaderboard Tab */}
                <TabsContent value="leaderboard" className="space-y-4">
                  <h3 className="font-medium">Top Players</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px]">Rank</TableHead>
                          <TableHead>Player</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead className="hidden sm:table-cell">Country</TableHead>
                          <TableHead className="text-right">Win Rate</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leaderboardUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.rank}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.rating}</TableCell>
                            <TableCell className="hidden sm:table-cell">{user.country}</TableCell>
                            <TableCell className="text-right">{user.winRate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                {/* Tournaments Tab */}
                <TabsContent value="tournaments" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Upcoming Tournaments</h3>
                    <Button size="sm">Create Tournament</Button>
                  </div>
                  <div className="space-y-4">
                    {tournaments.map((tournament) => (
                      <Card key={tournament.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{tournament.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{tournament.date}</span>
                                <span>•</span>
                                <span>{tournament.players} players</span>
                              </div>
                            </div>
                            <Badge>{tournament.status}</Badge>
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button variant={tournament.status === "Registration Open" ? "default" : "outline"} size="sm">
                              {tournament.status === "Registration Open" ? "Register" : "View Details"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Forum Tab */}
                <TabsContent value="forum" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Popular Discussions</h3>
                    <Button size="sm">New Topic</Button>
                  </div>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Topic</TableHead>
                          <TableHead className="hidden sm:table-cell">Author</TableHead>
                          <TableHead>Replies</TableHead>
                          <TableHead className="text-right">Last Active</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {forumTopics.map((topic) => (
                          <TableRow key={topic.id} className="cursor-pointer hover:bg-muted/50">
                            <TableCell className="font-medium">{topic.title}</TableCell>
                            <TableCell className="hidden sm:table-cell">{topic.author}</TableCell>
                            <TableCell>{topic.replies}</TableCell>
                            <TableCell className="text-right">{topic.lastActive}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex justify-center">
                    <Button variant="link">View All Topics</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default CommunityPage;
