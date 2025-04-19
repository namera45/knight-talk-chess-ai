
import { motion } from 'framer-motion';
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    aiCommentary: true,
    notifications: true,
    darkMode: true,
    soundEffects: true
  });

  const updateSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-glow">Settings</h1>
        </div>

        <div className="grid gap-6">
          <Card className="neo-blur">
            <CardHeader>
              <CardTitle>Game Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>AI Commentary</Label>
                  <p className="text-sm text-muted-foreground">Enable real-time game commentary</p>
                </div>
                <Switch
                  checked={settings.aiCommentary}
                  onCheckedChange={() => updateSetting('aiCommentary')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">Play sounds for moves and events</p>
                </div>
                <Switch
                  checked={settings.soundEffects}
                  onCheckedChange={() => updateSetting('soundEffects')}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="neo-blur">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Use dark theme</p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={() => updateSetting('darkMode')}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="neo-blur">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified about games and updates</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={() => updateSetting('notifications')}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="neo-blur">
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="destructive" className="w-full">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default SettingsPage;
