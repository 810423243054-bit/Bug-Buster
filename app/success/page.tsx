import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-white mb-2">
                Challenge Completed!
              </CardTitle>
              <CardDescription className="text-lg text-purple-200">
                Thank you for participating! Your results have been recorded.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-3">What happens next?</h3>
                <ul className="text-purple-200 space-y-2 text-left">
                  <li>• Your submission has been safely recorded</li>
                  <li>• Results will be evaluated by our coordinators</li>
                  <li>• Scores and rankings will be announced separately</li>
                  <li>• Thank you for testing your debugging skills!</li>
                </ul>
              </div>

              <div className="text-center">
                <Link href="/">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Home className="w-4 h-4 mr-2" />
                    Return to Home
                  </Button>
                </Link>
              </div>

              <div className="text-center text-gray-400 text-sm">
                <p>Keep practicing and improving your Python debugging skills!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}