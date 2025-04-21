
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, User, Bell, Layout } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';

const SettingsPage = () => {
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
            <h1 className="text-3xl font-bold text-glow">Settings</h1>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="ChessMaster123" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="chess@example.com" />
                </div>
                <Button>Update Profile</Button>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input id="language" defaultValue="English" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="UTC-5" />
                </div>
                <Button>Save Preferences</Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Notifications</Label>
                  <div className="grid gap-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Game Invites</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Tournament Updates</span>
                    </label>
                  </div>
                </div>
                <Button>Update Notifications</Button>
              </CardContent>
            </Card>

            {/* Interface Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="h-5 w-5" />
                  Interface
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme Preferences</Label>
                  <div className="grid gap-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="theme" defaultChecked className="rounded" />
                      <span>Dark Mode</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="theme" className="rounded" />
                      <span>Light Mode</span>
                    </label>
                  </div>
                </div>
                <Button>Save Interface Settings</Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
