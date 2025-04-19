
import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CommunityPage = () => {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h1 className="text-2xl font-bold text-glow">Community</h1>

        <Tabs defaultValue="forums" className="w-full">
          <TabsList className="grid w-full grid-cols-4 neo-blur">
            <TabsTrigger value="forums">Forums</TabsTrigger>
            <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="replays">Game Replays</TabsTrigger>
          </TabsList>
          
          <TabsContent value="forums">
            <Card className="neo-blur">
              <CardHeader>
                <CardTitle>Strategy Discussion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Coming soon: Join discussions about chess strategy and tactics.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tournaments">
            <Card className="neo-blur">
              <CardHeader>
                <CardTitle>Active Tournaments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Coming soon: Create and join chess tournaments.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="leaderboard">
            <Card className="neo-blur">
              <CardHeader>
                <CardTitle>Global Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Coming soon: View global player rankings and achievements.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="replays">
            <Card className="neo-blur">
              <CardHeader>
                <CardTitle>Featured Games</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Coming soon: Watch and analyze featured chess matches.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
};

export default CommunityPage;
