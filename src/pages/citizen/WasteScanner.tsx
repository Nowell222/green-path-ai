import { useState, useRef, useCallback } from 'react';
import CitizenLayout from '@/components/layouts/CitizenLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Camera, 
  Upload, 
  Zap, 
  Recycle, 
  Leaf, 
  Trash2, 
  AlertTriangle,
  MapPin,
  Share2,
  BookmarkPlus,
  Sparkles,
  CheckCircle2,
  Info,
  X,
  RotateCcw,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ScanResult {
  classification: string;
  category: 'recyclable' | 'biodegradable' | 'residual' | 'hazardous';
  confidence: number;
  material: string;
  condition: string;
  disposalMethod: string[];
  nearestDropoff: {
    name: string;
    distance: string;
    hours: string;
  };
  environmentalImpact: string;
  didYouKnow: string;
  points: number;
}

const mockResults: Record<string, ScanResult> = {
  recyclable: {
    classification: 'RECYCLABLE PLASTIC',
    category: 'recyclable',
    confidence: 94,
    material: 'PET Plastic (#1)',
    condition: 'Clean & Dry ✓',
    disposalMethod: [
      'Rinse thoroughly',
      'Remove cap & label',
      'Flatten bottle',
      'Place in BLUE recycling bin'
    ],
    nearestDropoff: {
      name: 'Barangay Recycling Center',
      distance: '0.8 km away',
      hours: 'Open until 5 PM'
    },
    environmentalImpact: 'Recycling this saves 30g CO₂',
    didYouKnow: 'PET bottles can be recycled into clothing fibers and new containers!',
    points: 5
  },
  biodegradable: {
    classification: 'ORGANIC WASTE',
    category: 'biodegradable',
    confidence: 91,
    material: 'Food Scraps',
    condition: 'Suitable for composting ✓',
    disposalMethod: [
      'Separate from packaging',
      'Place in GREEN biodegradable bin',
      'Or add to home compost pile',
      'Avoid mixing with plastics'
    ],
    nearestDropoff: {
      name: 'Community Composting Center',
      distance: '1.2 km away',
      hours: 'Open until 4 PM'
    },
    environmentalImpact: 'Composting prevents methane emissions',
    didYouKnow: 'Food waste in landfills produces harmful greenhouse gases!',
    points: 3
  },
  hazardous: {
    classification: 'HAZARDOUS WASTE',
    category: 'hazardous',
    confidence: 88,
    material: 'Battery / E-Waste',
    condition: 'Handle with care ⚠️',
    disposalMethod: [
      'Do NOT throw in regular bins',
      'Store safely in container',
      'Bring to designated drop-off point',
      'Never burn or puncture'
    ],
    nearestDropoff: {
      name: 'MENRO Hazardous Waste Collection',
      distance: '2.5 km away',
      hours: 'Saturdays 8 AM - 12 PM'
    },
    environmentalImpact: 'Proper disposal prevents soil and water contamination',
    didYouKnow: 'One battery can contaminate 600,000 liters of water!',
    points: 10
  },
  residual: {
    classification: 'RESIDUAL WASTE',
    category: 'residual',
    confidence: 85,
    material: 'Mixed Non-Recyclable',
    condition: 'Non-recyclable material',
    disposalMethod: [
      'Ensure item cannot be recycled',
      'Place in BLACK residual bin',
      'Keep separate from recyclables',
      'Compact to save space'
    ],
    nearestDropoff: {
      name: 'Regular Collection Schedule',
      distance: 'Next pickup: Tomorrow',
      hours: 'Every Mon, Wed, Fri'
    },
    environmentalImpact: 'Reducing residual waste saves landfill space',
    didYouKnow: 'Many items thought to be trash can actually be recycled!',
    points: 2
  }
};

const categoryColors = {
  recyclable: { bg: 'bg-[hsl(var(--waste-recyclable))]/10', text: 'text-[hsl(var(--waste-recyclable))]' },
  biodegradable: { bg: 'bg-[hsl(var(--waste-biodegradable))]/10', text: 'text-[hsl(var(--waste-biodegradable))]' },
  residual: { bg: 'bg-[hsl(var(--waste-residual))]/10', text: 'text-[hsl(var(--waste-residual))]' },
  hazardous: { bg: 'bg-[hsl(var(--waste-hazardous))]/10', text: 'text-[hsl(var(--waste-hazardous))]' },
};

const categoryIcons = {
  recyclable: Recycle,
  biodegradable: Leaf,
  residual: Trash2,
  hazardous: AlertTriangle,
};

export default function WasteScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (err) {
      console.error('Camera error:', err);
      setCameraError('Could not access camera. Please check permissions or try uploading an image instead.');
      toast.error('Camera access denied');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(dataUrl);
        stopCamera();
        analyzeImage();
      }
    }
  }, [stopCamera]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsScanning(true);
    // Simulate AI analysis with random result
    setTimeout(() => {
      const categories = ['recyclable', 'biodegradable', 'hazardous', 'residual'] as const;
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      setScanResult(mockResults[randomCategory]);
      setIsScanning(false);
      toast.success('Scan complete!', { description: 'Waste item identified successfully' });
    }, 2500);
  };

  const handleReset = () => {
    setScanResult(null);
    setCapturedImage(null);
    setShowCamera(false);
    setCameraError(null);
  };

  const handleShare = () => {
    if (scanResult) {
      if (navigator.share) {
        navigator.share({
          title: 'JuanLessTrash Scan Result',
          text: `I just identified ${scanResult.classification}. ${scanResult.environmentalImpact}`,
          url: window.location.href
        });
      } else {
        toast.success('Result copied to clipboard!');
      }
    }
  };

  const handleSaveResult = () => {
    toast.success('Saved to your collection!');
  };

  const handleDirections = () => {
    toast.info('Opening maps...');
    // In a real app, this would open Google Maps
  };

  const CategoryIcon = scanResult ? categoryIcons[scanResult.category] : Recycle;
  const colors = scanResult ? categoryColors[scanResult.category] : categoryColors.recyclable;

  return (
    <CitizenLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Waste Scanner</h1>
          <p className="text-muted-foreground">Scan any item to learn how to dispose of it properly</p>
        </div>

        {!scanResult ? (
          <>
            {/* Camera View / Upload Area */}
            <Card className="card-eco overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-muted relative flex items-center justify-center overflow-hidden">
                  {showCamera ? (
                    <>
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Viewfinder overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-64 h-64 border-2 border-white/70 rounded-2xl relative">
                          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
                        </div>
                      </div>
                      {/* Camera controls */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                        <Button 
                          size="lg" 
                          className="rounded-full w-16 h-16 shadow-lg"
                          onClick={capturePhoto}
                        >
                          <Camera className="w-6 h-6" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="rounded-full bg-white/80"
                          onClick={stopCamera}
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    </>
                  ) : capturedImage ? (
                    <>
                      <img 
                        src={capturedImage} 
                        alt="Captured" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {isScanning && (
                        <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                          <div className="relative">
                            <div className="w-24 h-24 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                            <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-primary" />
                          </div>
                          <p className="mt-4 font-medium">Analyzing waste item...</p>
                          <p className="text-sm text-muted-foreground">AI is identifying the material</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center p-8">
                      {cameraError ? (
                        <>
                          <div className="w-20 h-20 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-10 h-10 text-destructive" />
                          </div>
                          <p className="text-destructive mb-4">{cameraError}</p>
                          <Button variant="outline" onClick={() => setCameraError(null)}>
                            Try Again
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <Camera className="w-10 h-10 text-primary" />
                          </div>
                          <p className="text-muted-foreground">
                            Take a photo or upload an image of your waste item
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {!showCamera && !capturedImage && !cameraError && (
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  size="lg" 
                  className="h-14"
                  onClick={startCamera}
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Take Photo
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Image
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            )}

            {capturedImage && !isScanning && (
              <Button variant="outline" className="w-full" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Take Another Photo
              </Button>
            )}

            {/* Tips */}
            {!showCamera && !capturedImage && (
              <Card className="card-eco">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[hsl(var(--waste-hazardous))]" />
                    Tips for Better Scanning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• Ensure good lighting for accurate results</p>
                  <p>• Focus on one item at a time</p>
                  <p>• Show any labels or recycling symbols</p>
                  <p>• Clean items scan more accurately</p>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <>
            {/* Scan Result */}
            <Card className="card-eco overflow-hidden">
              {capturedImage && (
                <div className="h-32 relative">
                  <img 
                    src={capturedImage} 
                    alt="Scanned item" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
                </div>
              )}
              <div className={cn("p-4", colors.bg)}>
                <div className="flex items-center gap-3">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colors.bg)}>
                    <CategoryIcon className={cn("w-6 h-6", colors.text)} />
                  </div>
                  <div className="flex-1">
                    <p className={cn("font-bold", colors.text)}>{scanResult.classification}</p>
                    <p className="text-sm text-muted-foreground">{scanResult.material}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{scanResult.confidence}%</p>
                    <p className="text-xs text-muted-foreground">confidence</p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4 space-y-4">
                {/* Condition */}
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[hsl(var(--status-success))]" />
                  <span>Condition: {scanResult.condition}</span>
                </div>

                {/* Disposal Method */}
                <div>
                  <p className="font-medium mb-2 flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Disposal Method
                  </p>
                  <div className="space-y-2">
                    {scanResult.disposalMethod.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nearest Drop-off */}
                <div className="p-3 rounded-lg bg-accent/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-medium text-sm">{scanResult.nearestDropoff.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {scanResult.nearestDropoff.distance} • {scanResult.nearestDropoff.hours}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={handleDirections}>
                      Directions
                    </Button>
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--waste-biodegradable))]/10">
                  <Leaf className="w-5 h-5 text-[hsl(var(--waste-biodegradable))]" />
                  <p className="text-sm font-medium">{scanResult.environmentalImpact}</p>
                </div>

                {/* Did You Know */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5">
                  <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-primary">Did You Know?</p>
                    <p className="text-sm">{scanResult.didYouKnow}</p>
                  </div>
                </div>

                {/* Points Earned */}
                <div className="flex items-center justify-center gap-2 py-3 border-t border-border">
                  <Sparkles className="w-5 h-5 text-[hsl(var(--waste-hazardous))]" />
                  <span className="font-medium">+{scanResult.points} points for proper identification!</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleReset}>
                <Camera className="w-4 h-4 mr-2" />
                Scan Another
              </Button>
              <Button variant="outline" size="icon" onClick={handleSaveResult}>
                <BookmarkPlus className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </CitizenLayout>
  );
}
