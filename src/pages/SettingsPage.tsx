
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MainLayout from '@/layouts/MainLayout';
import { SettingsIcon } from 'lucide-react';

const SettingsPage = () => {
  // Mock settings state
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [commentaryEnabled, setCommentaryEnabled] = useState(true);
  const [commentarySpeed, setCommentarySpeed] = useState([80]);
  const [commentaryVoice, setCommentaryVoice] = useState("alex");
  const [engineDepth, setEngineDepth] = useState([15]);
  const [boardTheme, setBoardTheme] = useState("classic");

  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-glow">Settings</h2>
          <span className="text-muted-foreground mb-6">Customize your chess experience</span>
        </div>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Configure the appearance and basic functionality of the application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Dark Mode</h4>
                      <p className="text-sm text-muted-foreground">
                        Toggle between light and dark theme
                      </p>
                    </div>
                    <Switch 
                      checked={darkMode} 
                      onCheckedChange={setDarkMode} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for game invites and turns
                      </p>
                    </div>
                    <Switch 
                      checked={notifications} 
                      onCheckedChange={setNotifications} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Sound Effects</h4>
                      <p className="text-sm text-muted-foreground">
                        Play sounds for moves and game events
                      </p>
                    </div>
                    <Switch 
                      checked={sound} 
                      onCheckedChange={setSound} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Board Theme</h4>
                    <Select value={boardTheme} onValueChange={setBoardTheme}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select board theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="wood">Wood</SelectItem>
                        <SelectItem value="tournament">Tournament</SelectItem>
                        <SelectItem value="marble">Marble</SelectItem>
                        <SelectItem value="neon">Neon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analysis">
            <Card>
              <CardHeader>
                <CardTitle>Analysis Settings</CardTitle>
                <CardDescription>
                  Configure the chess engine and analysis features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">AI Commentary</h4>
                      <p className="text-sm text-muted-foreground">
                        Enable voice commentary during games
                      </p>
                    </div>
                    <Switch 
                      checked={commentaryEnabled} 
                      onCheckedChange={setCommentaryEnabled} 
                    />
                  </div>
                  
                  {commentaryEnabled && (
                    <>
                      <Separator />
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Commentary Voice</h4>
                        <Select value={commentaryVoice} onValueChange={setCommentaryVoice}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select voice" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="alex">Alex (Male)</SelectItem>
                            <SelectItem value="samantha">Samantha (Female)</SelectItem>
                            <SelectItem value="daniel">Daniel (British)</SelectItem>
                            <SelectItem value="karen">Karen (Australian)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Commentary Speed</h4>
                          <span className="text-sm">{commentarySpeed}%</span>
                        </div>
                        <Slider 
                          value={commentarySpeed} 
                          onValueChange={setCommentarySpeed} 
                          min={50} 
                          max={150} 
                          step={5}
                        />
                      </div>
                    </>
                  )}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Engine Analysis Depth</h4>
                      <span className="text-sm">{engineDepth} moves</span>
                    </div>
                    <Slider 
                      value={engineDepth} 
                      onValueChange={setEngineDepth} 
                      min={5} 
                      max={25} 
                      step={1}
                    />
                    <p className="text-xs text-muted-foreground">
                      Higher depth gives more accurate analysis but takes longer to compute
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Email Notifications</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Game invitations</span>
                        <Switch defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Tournament reminders</span>
                        <Switch defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Marketing emails</span>
                        <Switch defaultChecked={false} />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-4">Danger Zone</h4>
                    <div className="space-y-4">
                      <div>
                        <Button variant="outline">Change Password</Button>
                      </div>
                      <div>
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
