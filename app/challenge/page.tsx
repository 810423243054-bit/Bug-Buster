
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Code, Save, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase';
import { challengeQuestions } from '@/lib/challenge-data';

interface StudentData {
  registerNumber: string;
  name: string;
}


export default function ChallengePage() {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 45 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const router = useRouter();

  // Auto-submit if user leaves the tab
  useEffect(() => {
    if (!challengeStarted) return;
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleAutoSubmit();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [challengeStarted, studentData]);

  // Strictly block browser back/refresh/close while challenge is active
  useEffect(() => {
    if (!challengeStarted) return;
    // Push a new state to block back
    window.history.pushState(null, '', window.location.href);
    const handlePopState = (e: PopStateEvent) => {
      window.history.pushState(null, '', window.location.href);
      alert('You cannot leave the challenge until you finish or time is up.');
    };
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [challengeStarted]);


  // Prevent leaving the page (back, refresh, close) until challenge is submitted or time is up
  useEffect(() => {
    if (!challengeStarted) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [challengeStarted]);

  useEffect(() => {
    // Check if student is registered
    const stored = sessionStorage.getItem('studentData');
    if (!stored) {
      router.push('/register');
      return;
    }

    const data = JSON.parse(stored) as StudentData;
    setStudentData(data);
    setChallengeStarted(true);
  }, [router]);

  useEffect(() => {
    if (!challengeStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [challengeStarted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleAutoSubmit = async () => {
    if (!studentData) return;
    await submitAnswers(true);
  };

  const handleSubmit = async () => {
    if (!studentData) return;
    await submitAnswers(false);
  };

  const submitAnswers = async (autoSubmit: boolean = false) => {
    setSubmitting(true);
    try {
      const supabase = createClient();

      // Helper to normalize answers: remove all whitespace and lowercase
      const normalize = (str: string) => str.replace(/\s+/g, '').toLowerCase();

      // Calculate score: 1 point for each correct answer (normalized)
      let score = 0;
      challengeQuestions.forEach((question, index) => {
        const userAnswer = answers[index] || '';
        const userNormalized = normalize(userAnswer);
        const correctNormalized = normalize(question.correctAnswer);
        const isCorrect = userNormalized === correctNormalized;
        if (isCorrect) {
          score += 1;
        }
      });

      // Set status and score for disqualified users
      const status = autoSubmit ? 'disqualified' : 'completed';
      const finalScore = status === 'disqualified' ? 0 : score;

      // Upsert score and status into score_table
      const { error } = await supabase
        .from('score_table')
        .upsert([
          {
            register_number: studentData!.registerNumber,
            student_name: studentData!.name,
            score: finalScore,
            status: status
          }
        ], { onConflict: 'register_number' });

      if (error) {
        console.error('Supabase error:', error);
        toast.error(`Submission failed: ${error.message || error}`);
        setSubmitting(false);
        return;
      }

      // Clear session data
      sessionStorage.removeItem('studentData');

      if (autoSubmit) {
        toast.info('You have been disqualified for leaving the tab. Your answers have been submitted.');
      } else {
        toast.success('Challenge completed successfully!');
      }

      router.push('/success');
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(`Submission failed: ${error.message || error}`);
      setSubmitting(false);
    }
  };

  if (!challengeStarted || !studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading challenge...</div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / challengeQuestions.length) * 100;
  const timeProgress = (timeLeft / (30 * 60)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-6 border border-white/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-white">Python Debugging Challenge</h1>
              <p className="text-purple-200">Welcome, {studentData.name}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                <span className={`font-mono text-lg font-bold ${timeLeft < 300 ? 'text-red-400' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              
              {timeLeft < 230 && (
                <Badge variant="destructive" className="animate-pulse">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Hurry!
                </Badge>
              )}
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-purple-200 mb-2">
              <span>Time Remaining</span>
              <span>{formatTime(timeLeft)}</span>
            </div>
            <Progress 
              value={timeProgress} 
              className={`h-2 ${timeLeft < 300 ? 'bg-red-900' : ''}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 lg:grid-cols-1 gap-2">
                  {challengeQuestions.map((_, index) => (
                    <Button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      variant={currentQuestion === index ? "default" : "outline"}
                      size="sm"
                      className={`
                        ${currentQuestion === index 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : answers[index] 
                            ? 'bg-green-600/20 border-green-500 text-green-300 hover:bg-green-600/30' 
                            : 'border-white/30 text-white hover:bg-white/10'
                        }
                      `}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
                <div className="mt-4 text-sm text-purple-200">
                  Progress: {Object.keys(answers).length} / {challengeQuestions.length} completed
                </div>
                <Progress value={progress} className="mt-2 h-2" />
              </CardContent>
            </Card>
          </div>

          {/* Current Question */}
          <div className="lg:col-span-3">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Question {currentQuestion + 1}: {challengeQuestions[currentQuestion].title}</span>
                  <Badge variant="outline" className="border-purple-500 text-purple-300">
                    {challengeQuestions[currentQuestion].difficulty}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-white font-semibold mb-2">Problem Description:</h3>
                  <p className="text-purple-200">{challengeQuestions[currentQuestion].description}</p>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">Buggy Code:</h3>
                  <div className="code-editor p-4 overflow-x-auto">
                    <pre className="text-sm">
                      <code className="text-blue-200">{challengeQuestions[currentQuestion].buggyCode}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">Your Fixed Code:</h3>
                  <Textarea
                    value={answers[currentQuestion] || ''}
                    onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                    placeholder="Write your corrected code here..."
                    className="h-[300px] min-h-[300px] max-h-[300px] resize-none bg-white/10 border-white/30 text-white placeholder:text-gray-400 font-mono text-sm"
                  />
                </div>

                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                      disabled={currentQuestion === 0}
                      variant="outline"
                      className=" "
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={() => setCurrentQuestion(Math.min(challengeQuestions.length - 1, currentQuestion + 1))}
                      disabled={currentQuestion === challengeQuestions.length - 1}
                      variant="outline"
                      className=""
                    >
                      Next
                    </Button>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={submitting || currentQuestion !== challengeQuestions.length - 1}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {submitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
