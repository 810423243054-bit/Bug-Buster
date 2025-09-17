'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User, Hash, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase';

export default function RegisterPage() {
  const [registerNumber, setRegisterNumber] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerNumber || !name) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      const supabase = createClient();

      // Check if register number already exists
      const { data: existingStudent, error: checkError } = await supabase
        .from('score_table')
        .select('register_number')
        .eq('register_number', registerNumber)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingStudent) {
        toast.error('You have already participated.');
        setLoading(false);
        return;
      }

      // Insert new row with all required fields
      const { error: insertError } = await supabase
        .from('score_table')
        .insert([
          {
            register_number: registerNumber,
            student_name: name.trim(),
            score: 0 // initial score
          }
        ]);

      if (insertError) {
        throw insertError;
      }

      // Store registration info in sessionStorage for the challenge
      sessionStorage.setItem('studentData', JSON.stringify({
        registerNumber,
        name: name.trim()
      }));

      toast.success('Registration successful!');
      router.push('/challenge');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background pattern */}
  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </header>

        {/* Registration Form */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-white">
                  Register for Challenge
                </CardTitle>
                <CardDescription className="text-purple-200">
                  Enter your details to begin the debugging arena
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="registerNumber" className="text-white flex items-center">
                      <Hash className="w-4 h-4 mr-2" />
                      Register Number
                    </Label>
                    <Input
                      id="registerNumber"
                      type="text"
                      value={registerNumber}
                      onChange={(e) => setRegisterNumber(e.target.value)}
                      placeholder="Enter your register number"
                      className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                      disabled={loading}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      'Enter the Arena'
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">
                    Once registered, you cannot change your details.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}