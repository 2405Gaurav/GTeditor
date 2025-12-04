import { useState } from "react";
import { PatternSettings } from "@/lib/pattern-utils";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { HelpCircle, Palette, Sparkles, Droplet } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PRESET_GRADIENTS, PRESET_COLORS } from "@/lib/gradient-utils";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GradientSelectorProps {
  pattern: {
    patternStyle: PatternSettings;
    background: string;
    content: {
      title: string;
      subtitle: string;
      image?: string;
    };
  };
  onChange: (newGradient: { background: string }) => void;
}

const GradientSelector = ({ pattern, onChange }: GradientSelectorProps) => {
  const [gradientAngle, setGradientAngle] = useState(135);
  const [colorStart, setColorStart] = useState("#3B82F6");
  const [colorEnd, setColorEnd] = useState("#8B5CF6");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const handleGradientSelect = (gradient: string) => {
    setActivePreset(gradient);
    onChange({ background: gradient });
  };

  const handleCustomGradientChange = () => {
    const customGradient = `linear-gradient(${gradientAngle}deg, ${colorStart} 0%, ${colorEnd} 100%)`;
    setActivePreset(null);
    onChange({ background: customGradient });
  };

  const handleColorSelect = (color: string) => {
    setActivePreset(color);
    onChange({ background: color });
  };

  const handleSolidColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivePreset(null);
    onChange({ background: e.target.value });
  };

  const handleAngleChange = (value: number[]) => {
    setGradientAngle(value[0]);
    setTimeout(handleCustomGradientChange, 10);
  };

  const handleStartColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorStart(e.target.value);
    setTimeout(handleCustomGradientChange, 10);
  };

  const handleEndColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorEnd(e.target.value);
    setTimeout(handleCustomGradientChange, 10);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20">
            <Palette className="h-4 w-4 text-pink-400" />
          </div>
          <h3 className="text-base font-semibold text-white/90">Background Style</h3>
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-white/40 hover:text-white/60 transition-colors cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Choose from preset gradients, create custom gradients, or use solid colors</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
        <Tabs defaultValue="preset" className="w-full">
          <TabsList className="grid grid-cols-3 mb-5 bg-white/5 p-1">
            <TabsTrigger value="preset" className="data-[state=active]:bg-white/10">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Presets
            </TabsTrigger>
            <TabsTrigger value="custom" className="data-[state=active]:bg-white/10">
              <Palette className="h-3.5 w-3.5 mr-1.5" />
              Custom
            </TabsTrigger>
            <TabsTrigger value="solid" className="data-[state=active]:bg-white/10">
              <Droplet className="h-3.5 w-3.5 mr-1.5" />
              Solid
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preset" className="mt-0">
            <div className="mb-3">
              <p className="text-xs text-white/50">Click any gradient to apply</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin">
              {PRESET_GRADIENTS.map((gradient, index) => (
                <div 
                  key={index}
                  className={`relative h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all hover:scale-[1.03] ${
                    activePreset === gradient 
                      ? 'border-white/60 ring-2 ring-white/30' 
                      : 'border-white/10 hover:border-white/30'
                  }`}
                  style={{ background: gradient }}
                  onClick={() => handleGradientSelect(gradient)}
                >
                  {activePreset === gradient && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="bg-white text-black px-2 py-1 rounded text-xs font-medium">
                        ✓ Active
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="mt-0 space-y-5">
            <div>
              <Label className="text-xs text-white/60 mb-2 block">Preview</Label>
              <div className="h-24 rounded-lg overflow-hidden border border-white/20 shadow-lg" 
                style={{ background: `linear-gradient(${gradientAngle}deg, ${colorStart} 0%, ${colorEnd} 100%)` }} 
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="angle" className="flex items-center gap-2 mb-2.5">
                  <span className="text-sm">Gradient Angle</span>
                  <span className="text-xs text-white/40">Rotate the gradient direction</span>
                </Label>
                <div className="flex items-center gap-3">
                  <Slider 
                    id="angle"
                    min={0} 
                    max={360} 
                    step={1} 
                    value={[gradientAngle]} 
                    onValueChange={handleAngleChange}
                    className="flex-1"
                  />
                  <span className="text-sm font-mono bg-white/5 px-3 py-1.5 rounded border border-white/10 min-w-[60px] text-center">
                    {gradientAngle}°
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-color" className="text-sm mb-2 block">Start Color</Label>
                  <div className="flex gap-2">
                    <div className="w-12 h-12 rounded-lg border-2 border-white/20 overflow-hidden hover:border-white/40 transition-colors">
                      <input 
                        type="color" 
                        id="start-color" 
                        value={colorStart} 
                        onChange={handleStartColorChange}
                        className="h-14 w-14 -m-1 cursor-pointer"
                      />
                    </div>
                    <input 
                      type="text" 
                      value={colorStart} 
                      onChange={handleStartColorChange}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="end-color" className="text-sm mb-2 block">End Color</Label>
                  <div className="flex gap-2">
                    <div className="w-12 h-12 rounded-lg border-2 border-white/20 overflow-hidden hover:border-white/40 transition-colors">
                      <input 
                        type="color" 
                        id="end-color" 
                        value={colorEnd} 
                        onChange={handleEndColorChange}
                        className="h-14 w-14 -m-1 cursor-pointer"
                      />
                    </div>
                    <input 
                      type="text" 
                      value={colorEnd} 
                      onChange={handleEndColorChange}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="solid" className="mt-0 space-y-5">
            <div>
              <Label className="text-xs text-white/60 mb-2 block">Preview</Label>
              <div 
                className="h-24 rounded-lg overflow-hidden border border-white/20 shadow-lg" 
                style={{ background: pattern.background.startsWith('#') || pattern.background.startsWith('rgb') ? pattern.background : '#000000' }} 
              />
            </div>

            <div>
              <Label className="text-sm mb-2.5 block">Color Presets</Label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-5">
                {PRESET_COLORS.map((color, index) => (
                  <div 
                    key={index}
                    className={`h-12 rounded-lg overflow-hidden cursor-pointer border-2 transition-all hover:scale-110 ${
                      activePreset === color 
                        ? 'border-white/60 ring-2 ring-white/30' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    style={{ background: color }}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="solid-color" className="text-sm mb-2 block">Custom Color</Label>
              <div className="flex gap-2">
                <div className="w-12 h-12 rounded-lg border-2 border-white/20 overflow-hidden hover:border-white/40 transition-colors">
                  <input 
                    type="color" 
                    id="solid-color" 
                    value={pattern.background.startsWith('#') ? pattern.background : '#000000'} 
                    onChange={handleSolidColorChange}
                    className="h-14 w-14 -m-1 cursor-pointer"
                  />
                </div>
                <input 
                  type="text" 
                  value={pattern.background} 
                  onChange={handleSolidColorChange}
                  placeholder="#000000 or rgb(0,0,0)"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GradientSelector;