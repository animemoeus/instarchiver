import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, ImageIcon, ArrowRight, Code, Globe } from 'lucide-react';
import Star32 from '@/components/stars/s32';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-main via-main to-main p-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Card */}
        <div className="bg-secondary-background rounded-3xl p-12 shadow-2xl border-2 border-border">
          {/* Logo and Since Badge */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center">
                <Star32 size={32} color="white" />
              </div>
              <span className="text-4xl font-bold text-foreground">InstArchiver</span>
            </div>
            <div className="bg-foreground text-secondary-background px-6 py-2 rounded-full text-lg font-medium">
              Since 2024
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-8xl font-black text-foreground leading-tight tracking-tight">
              INSTAGRAM ARCHIVER
            </h1>
          </div>

          {/* Navigation Arrows and Service Badge */}
          <div className="flex justify-between items-center mb-16">
            <div className="flex space-x-4">
              <Button variant="default" size="icon" asChild>
                <Link href="/users">
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button variant="default" size="icon" asChild>
                <Link href="/stories">
                  <ArrowRight size={20} />
                </Link>
              </Button>
            </div>

            <div className="bg-main text-main-foreground px-8 py-3 rounded-full text-lg font-semibold flex items-center space-x-2">
              <div className="w-6 h-6 bg-foreground rounded flex items-center justify-center">
                <span className="text-secondary-background text-xs">📊</span>
              </div>
              <span>Content Archiving & Management</span>
            </div>
          </div>

          {/* Contact/Info Bar */}
          <div className="bg-secondary-background border-2 border-border rounded-full p-6">
            <div className="flex justify-between items-center text-foreground">
              <div className="flex items-center space-x-3">
                <Code className="w-5 h-5" />
                <span className="text-lg font-medium">Open Source Project</span>
              </div>

              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5" />
                <span className="text-lg font-medium">Next.js • React Query</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-main rounded-full"></div>
                <span className="text-lg font-medium">Neo Brutalist Design</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
