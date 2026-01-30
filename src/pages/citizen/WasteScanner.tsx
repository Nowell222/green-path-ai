import { useState, useRef, useCallback } from 'react';
import CitizenLayout from '@/components/layouts/CitizenLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Camera, 
  Upload, 
  Zap, 
  Trash2, 
  AlertTriangle,
  MapPin,
  Share2,
  BookmarkPlus,
  Info,
  X,
  RotateCcw,
  Leaf,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import fastFoodCupImage from '@/assets/fastfood-cup-sample.jpg';

// Static informational text for fast food cups
const FAST_FOOD_CUP_INFO = {
  title: "Fast Food Cup Analysis",
  classification: "NON-BIODEGRADABLE / RESIDUAL WASTE",
  description: "Fast food cups may look like paper but usually contain a plastic lining (polyethylene coating) that makes them waterproof. This plastic lining categorizes them as non-biodegradable and difficult to recycle.",
  properties: [
    "Material: Paper with polyethylene (PE) plastic lining",
    "Recyclability: Difficult - most recycling facilities cannot separate the plastic lining",
    "Biodegradability: Not compostable in regular composting conditions",
    "Decomposition time: 20-30 years in landfills"
  ],
  environmentalImpact: "When disposed improperly, the plastic lining breaks down into microplastics that can contaminate soil and water. These microplastics affect soil quality and can be absorbed by plants, entering the food chain. The plastic residue also prevents natural decomposition of the paper component.",
  disposalOptions: [
    "✓ Treat as RESIDUAL WASTE - place in black bin",
    "✓ Check for local specialized recycling programs that accept lined paper products",
    "✓ Some facilities offer waste-to-energy processing for these items",
    "✗ Do NOT place in regular paper recycling",
    "✗ Do NOT compost - plastic will not break down"
  ],
  conclusion: "Fast food cups are NOT eco-friendly. The best environmental choice is to reduce the use of single-use cups by bringing your own reusable container or choosing to dine in with washable cups when possible.",
  nearestDropoff: {
    name: 'Regular Residual Collection',
    distance: 'Next pickup: Tomorrow',
    hours: 'Every Mon, Wed, Fri'
  }
};

export default function WasteScanner() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

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
        setShowResult(true);
        toast.success('Image captured!');
      }
    }
  }, [stopCamera]);

  const handleUploadImage = () => {
    // Automatically show the sample fast food cup image
    setCapturedImage(fastFoodCupImage);
    setShowResult(true);
    toast.success('Image uploaded successfully!');
  };

  const handleReset = () => {
    setCapturedImage(null);
    setShowCamera(false);
    setCameraError(null);
    setShowResult(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'JuanLessTrash Scan Result',
        text: `I just learned about fast food cup disposal! ${FAST_FOOD_CUP_INFO.conclusion}`,
        url: window.location.href
      });
    } else {
      toast.success('Result copied to clipboard!');
    }
  };

  const handleSaveResult = () => {
    toast.success('Saved to your collection!');
  };

  const handleDirections = () => {
    toast.info('Opening maps...');
  };

  return (
    <CitizenLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Waste Scanner</h1>
          <p className="text-muted-foreground">Scan any item to learn how to dispose of it properly</p>
        </div>

        {!showResult ? (
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
                    <img 
                      src={capturedImage} 
                      alt="Captured" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
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
                  onClick={handleUploadImage}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Image
                </Button>
              </div>
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
            {/* Scan Result - Static Fast Food Cup Info */}
            <Card className="card-eco overflow-hidden">
              {capturedImage && (
                <div className="h-48 relative">
                  <img 
                    src={capturedImage} 
                    alt="Scanned item" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
                </div>
              )}
              
              <div className="p-4 bg-[hsl(var(--waste-residual))]/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--waste-residual))]/20 flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-[hsl(var(--waste-residual))]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[hsl(var(--waste-residual))]">{FAST_FOOD_CUP_INFO.classification}</p>
                    <p className="text-sm text-muted-foreground">{FAST_FOOD_CUP_INFO.title}</p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4 space-y-4">
                {/* Description */}
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm">{FAST_FOOD_CUP_INFO.description}</p>
                </div>

                {/* Properties */}
                <div>
                  <p className="font-medium mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Material Properties
                  </p>
                  <div className="space-y-1">
                    {FAST_FOOD_CUP_INFO.properties.map((prop, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">• {prop}</p>
                    ))}
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="p-3 rounded-lg bg-[hsl(var(--status-warning))]/10 border border-[hsl(var(--status-warning))]/20">
                  <p className="font-medium mb-2 flex items-center gap-2 text-[hsl(var(--status-warning))]">
                    <AlertCircle className="w-4 h-4" />
                    Environmental Impact
                  </p>
                  <p className="text-sm">{FAST_FOOD_CUP_INFO.environmentalImpact}</p>
                </div>

                {/* Disposal Options */}
                <div>
                  <p className="font-medium mb-2 flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Disposal Options
                  </p>
                  <div className="space-y-1">
                    {FAST_FOOD_CUP_INFO.disposalOptions.map((option, idx) => (
                      <p key={idx} className={cn(
                        "text-sm",
                        option.startsWith('✓') ? 'text-[hsl(var(--status-success))]' : 'text-[hsl(var(--status-error))]'
                      )}>
                        {option}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Nearest Drop-off */}
                <div className="p-3 rounded-lg bg-accent/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-medium text-sm">{FAST_FOOD_CUP_INFO.nearestDropoff.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {FAST_FOOD_CUP_INFO.nearestDropoff.distance} • {FAST_FOOD_CUP_INFO.nearestDropoff.hours}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={handleDirections}>
                      Directions
                    </Button>
                  </div>
                </div>

                {/* Conclusion */}
                <div className="p-3 rounded-lg bg-[hsl(var(--waste-biodegradable))]/10">
                  <div className="flex items-start gap-3">
                    <Leaf className="w-5 h-5 text-[hsl(var(--waste-biodegradable))] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-[hsl(var(--waste-biodegradable))]">Better Choice</p>
                      <p className="text-sm">{FAST_FOOD_CUP_INFO.conclusion}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
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
