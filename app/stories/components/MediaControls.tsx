import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface MediaControlsProps {
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  isLooping: boolean;
  setIsLooping: (loop: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

export function MediaControls({
  isMuted,
  setIsMuted,
  isLooping,
  setIsLooping,
  volume,
  setVolume,
}: MediaControlsProps) {
  return (
    <Card className="mt-8 bg-fuchsia-100">
      <CardHeader className="border-b-3 border-black bg-amber-300">
        <CardTitle className="text-3xl font-black uppercase">Media Controls</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-4">
            <label className="text-lg font-bold flex items-center gap-2 border-2 border-black p-3 rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
              <Input
                type="checkbox"
                checked={isMuted}
                onChange={e => setIsMuted(e.target.checked)}
                className="w-6 h-6 border-2 border-black rounded"
              />
              <span className="uppercase">Mute Audio</span>
            </label>

            <label className="text-lg font-bold flex items-center gap-2 border-2 border-black p-3 rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
              <Input
                type="checkbox"
                checked={isLooping}
                onChange={e => setIsLooping(e.target.checked)}
                className="w-6 h-6 border-2 border-black rounded"
              />
              <span className="uppercase">Loop Videos</span>
            </label>
          </div>

          <div
            className={`p-4 border-2 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${isMuted ? 'opacity-50 bg-gray-100' : 'bg-blue-100'}`}
          >
            <label className="text-lg font-black block mb-3 uppercase">Volume Control:</label>
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={[volume]}
              onValueChange={values => setVolume(values[0])}
              disabled={isMuted}
              className="mb-2"
            />
            <div className="flex justify-between text-sm font-bold mt-2">
              <span className="px-2 py-1 bg-black text-white rounded">0%</span>
              <span className="px-2 py-1 bg-black text-white rounded">
                {Math.round(volume * 100)}%
              </span>
              <span className="px-2 py-1 bg-black text-white rounded">100%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
