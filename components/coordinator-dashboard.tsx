'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Users, Trophy, Clock, LogOut, RefreshCw } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { toast } from 'sonner';

interface ScoreRow {
  id: number;
  register_number: string | number;
  student_name: string;
  score: number;
  status?: string;
}

export function CoordinatorDashboard() {
  const [scores, setScores] = useState<ScoreRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();

      // Fetch score_table (replicated supabase table)
      const { data: scoresData, error: scoresError } = await supabase
        .from('score_table')
        .select('*')

      if (scoresError) throw scoresError;

      setScores(scoresData || []);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.reload();
  };

  const exportResults = () => {
    const csvContent = [
      ['Register Number', 'Student Name', 'Score', 'Status'].join(','),
      ...scores.map(row => [
        row.register_number,
        row.student_name,
        row.score,
        row.status ? row.status.charAt(0).toUpperCase() + row.status.slice(1) : ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'debugging_challenge_score_table.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // no-op: times not used for score_table

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  const totalStudents = scores.length;
  const totalSubmissions = scores.length;
  const averageScore = scores.length > 0
    ? (scores.reduce((sum, s) => sum + (s.score || 0), 0) / scores.length).toFixed(1)
    : '0';
  const completionRate = scores.length > 0 ? '100' : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Coordinator Dashboard</h1>
            <p className="text-purple-200">Python Debugging Challenge Results</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-red-500 text-red-300 hover:bg-red-500/10">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">{totalStudents}</p>
                  <p className="text-purple-200 text-sm">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">{totalSubmissions}</p>
                  <p className="text-purple-200 text-sm">Submissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-green-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">{averageScore}</p>
                  <p className="text-purple-200 text-sm">Avg Score (/30)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">%</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{completionRate}%</p>
                  <p className="text-purple-200 text-sm">Completion Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="submissions" className="w-full">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center">
              <TabsList className="bg-white/10 border-white/20">
                <TabsTrigger value="submissions" className="data-[state=active]:bg-purple-600">
                  Submissions & Scores
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full mt-2">
              <Button
                onClick={fetchData}
                className="bg-blue-600 hover:bg-blue-700 md:w-auto w-full"
                disabled={loading}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                onClick={exportResults}
                className="bg-green-600 hover:bg-green-700 md:w-auto w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </Button>
            </div>
          </div>

          <TabsContent value="submissions">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Score Table</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20">
                        <TableHead className="text-purple-200">Register No.</TableHead>
                        <TableHead className="text-purple-200">Student Name</TableHead>
                        <TableHead className="text-purple-200">Score</TableHead>
                        <TableHead className="text-purple-200">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scores.map((row) => (
                        <TableRow key={String(row.register_number)} className="border-white/20">
                          <TableCell className="text-white font-mono">{row.register_number}</TableCell>
                          <TableCell className="text-white">{row.student_name}</TableCell>
                          <TableCell className="text-white">
                            <Badge variant="outline" className="border-green-500 text-green-400">
                              {row.score}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-white">
                            <Badge variant="outline" className={
                              row.status === 'disqualified'
                                ? 'border-red-500 text-red-400'
                                : 'border-blue-500 text-blue-400'
                            }>
                              {row.status ? row.status.charAt(0).toUpperCase() + row.status.slice(1) : '—'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
