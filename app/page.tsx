import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Code, Clock, Trophy, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background pattern */}
  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src="https://res.cloudinary.com/dwpzkfzuv/image/upload/v1758207647/img_uu86og.png" alt="Bug Buster Logo" className="h-36 w-36 rounded-full shadow-md" />
            </div>
            <Link href="/coordinator">
              <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/10">
                Coordinator Login
              </Button>
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-12 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Title */}
            <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              Dhanalakshmi Srinivasan Engg College(A)
            </h1>
            <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold text-white mb-6 leading-tight">
              Department of Artificial Intelligence & Data Science
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-purple-200 mb-2 font-medium">
              Organizing Debugging program
            </p>
            <p className="text-3xl md:text-4xl mb-8 font-bold bg-gradient-to-r from-purple-500 via-sky-400 to-blue-900 bg-clip-text text-transparent animate-glow drop-shadow-[0_0_20px_rgba(109,40,217,0.7)]">
              Bug Buster
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              You've got 13 broken Python snippets and 30 minutes on the clock. 
              No shortcuts, no gimmicks – just you, your skills, and a sea of bugs 
              waiting to be crushed.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Code className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">13</div>
                <div className="text-purple-200 text-sm">Python Challenges</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">30</div>
                <div className="text-purple-200 text-sm">Minutes to Code</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">∞</div>
                <div className="text-purple-200 text-sm">Learning Potential</div>
              </div>
            </div>

            {/* CTA Button */}
            <Link href="/register">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 text-lg shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-200"
              >
                Start Challenge
              </Button>
            </Link>
            
            <p className="text-gray-400 text-sm mt-4">
              Ready to prove your debugging skills?
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 mt-20">
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2025 The Debugging Arena. Built for Python developers.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
