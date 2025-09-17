'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { CoordinatorDashboard } from '@/components/coordinator-dashboard';

export default function CoordinatorPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Client-side credential check (for demo / local coordinator access)
      const expectedEmail = 'coordinator@example.com';
      const expectedPassword = 'example@123';

      if (email === expectedEmail && password === expectedPassword) {
        toast.success('Login successful!');
        setIsAuthenticated(true);
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <CoordinatorDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Coordinator Access
              </CardTitle>
              <CardDescription className="text-purple-200">
                Login to view challenge results and student data
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="coordinator@example.com"
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                    disabled={loading}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Access Dashboard'}
                </Button>
              </form>

              <div className="mt-6 text-center text-gray-400 text-sm">
                <p>Authorized coordinators only</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}