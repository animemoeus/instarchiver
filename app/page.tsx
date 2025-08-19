import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, ImageIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="h-screen max-h-screen overflow-hidden bg-background flex flex-col">
      {/* Hero Section - Top Half */}
      <div className="flex-1 flex items-center justify-center px-4 py-4 min-h-0">
        <div className="text-center space-y-4 max-w-4xl">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-heading text-foreground">
              INSTAGRAM
            </h1>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-heading text-foreground">
              ARCHIVER
            </h1>
          </div>

          <div className="flex gap-3 justify-center flex-wrap mt-4">
            <Badge variant="neutral" className="text-sm px-3 py-1">
              Neo Brutalist
            </Badge>
            <Badge variant="neutral" className="text-sm px-3 py-1">
              Open Source
            </Badge>
            <Badge variant="neutral" className="text-sm px-3 py-1">
              Modern
            </Badge>
          </div>

          <p className="text-lg md:text-xl max-w-2xl mx-auto font-base text-foreground leading-relaxed">
            A modern approach to archiving Instagram content
          </p>
        </div>
      </div>

      {/* Navigation Cards - Bottom Half */}
      <div className="flex-1 flex items-center justify-center px-4 py-2 min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-4xl h-full max-h-64">
          <Link href="/users" className="group">
            <Card className="h-full transition-all duration-300 hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none cursor-pointer">
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-3">
                  <div className="size-16 border-2 border-border bg-secondary-background rounded-base flex items-center justify-center">
                    <Users size={32} strokeWidth={2} className="text-foreground" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-heading text-foreground">USERS</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-foreground font-medium leading-relaxed mb-3 text-sm">
                  Browse Instagram user profiles and discover archived content
                </p>
                <Badge variant="neutral" className="text-xs">
                  Browse Profiles
                </Badge>
              </CardContent>
            </Card>
          </Link>

          <Link href="/stories" className="group">
            <Card className="h-full transition-all duration-300 hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none cursor-pointer">
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-3">
                  <div className="size-16 border-2 border-border bg-secondary-background rounded-base flex items-center justify-center">
                    <ImageIcon size={32} strokeWidth={2} className="text-foreground" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-heading text-foreground">STORIES</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-foreground font-medium leading-relaxed mb-3 text-sm">
                  Explore archived Instagram stories and organize media content
                </p>
                <Badge variant="neutral" className="text-xs">
                  View Stories
                </Badge>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="border-t-2 border-border py-4 flex-shrink-0">
        <div className="flex gap-4 items-center justify-center">
          <Button variant="default" size="default" className="font-heading px-6 py-2" asChild>
            <Link href="/users">GET STARTED</Link>
          </Button>
          <div className="text-foreground font-base text-sm">OR</div>
          <Button variant="neutral" size="default" className="font-heading px-6 py-2" asChild>
            <Link href="/stories">EXPLORE NOW</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
