import { useState } from 'react';
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
  Info
} from 'lucide-react';

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

const mockScanResult: ScanResult = {
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
};

const categoryColors = {
  recyclable: { bg: 'bg-waste-recyclable/10', text: 'text-waste-recyclable', badge: 'badge-recyclable' },
  biodegradable: { bg: 'bg-waste-biodegradable/10', text: 'text-waste-biodegradable', badge: 'badge-biodegradable' },
  residual: { bg: 'bg-waste-residual/10', text: 'text-waste-residual', badge: 'badge-residual' },
  hazardous: { bg: 'bg-waste-hazardous/10', text: 'text-waste-hazardous', badge: 'badge-hazardous' },
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

  const handleScan = () => {
    setIsScanning(true);
    setShowCamera(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(mockScanResult);
      setShowCamera(false);
    }, 2000);
  };

  const handleReset = () => {
    setScanResult(null);
    setShowCamera(false);
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
                <div className="aspect-square bg-muted relative flex items-center justify-center">
                  {showCamera ? (
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 flex flex-col items-center justify-center">
                      <div className="w-48 h-48 border-2 border-primary rounded-2xl animate-pulse" />
                      <p className="mt-4 text-sm text-muted-foreground">
                        {isScanning ? 'Analyzing...' : 'Position item in frame'}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Camera className="w-10 h-10 text-primary" />
                      </div>
                      <p className="text-muted-foreground">
                        Take a photo or upload an image of your waste item
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                size="lg" 
                className="h-14"
                onClick={handleScan}
                disabled={isScanning}
              >
                <Camera className="w-5 h-5 mr-2" />
                {isScanning ? 'Scanning...' : 'Take Photo'}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14"
                onClick={handleScan}
                disabled={isScanning}
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Image
              </Button>
            </div>

            {/* Tips */}
            <Card className="card-eco">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4 text-waste-hazardous" />
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
          </>
        ) : (
          <>
            {/* Scan Result */}
            <Card className="card-eco overflow-hidden">
              <div className={`p-4 ${colors.bg}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                    <CategoryIcon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold ${colors.text}`}>{scanResult.classification}</p>
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
                  <CheckCircle2 className="w-4 h-4 text-status-success" />
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
                    <Button size="sm" variant="outline">Directions</Button>
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-waste-biodegradable/10">
                  <Leaf className="w-5 h-5 text-waste-biodegradable" />
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
                  <Sparkles className="w-5 h-5 text-waste-hazardous" />
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
              <Button variant="outline" size="icon">
                <BookmarkPlus className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </CitizenLayout>
  );
}
