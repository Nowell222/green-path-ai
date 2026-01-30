import { useState, useRef } from 'react';
import CitizenLayout from '@/components/layouts/CitizenLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Camera, 
  Send,
  Truck,
  Clock,
  CheckCircle,
  Loader2,
  X,
  Image as ImageIcon,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

export default function EarlyCollectionRequest() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartCamera = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' },
        audio: false 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      toast.error('Could not access camera');
      setIsCapturing(false);
    }
  };

  const handleCapturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setPhoto(dataUrl);
      handleStopCamera();
      toast.success('Photo captured!');
    }
  };

  const handleStopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCapturing(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
        toast.success('Photo added!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!photo) {
      toast.error('Please take a photo of your garbage as proof');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success('Request submitted successfully!', {
      description: 'Your barangay will review and forward to MENRO'
    });
  };

  if (submitted) {
    return (
      <CitizenLayout>
        <div className="p-4 lg:p-6 pb-24 lg:pb-6 max-w-xl mx-auto">
          <Card className="card-eco">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-[hsl(var(--status-success))]/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-[hsl(var(--status-success))]" />
              </div>
              <h2 className="text-xl font-display font-bold">Request Submitted!</h2>
              <p className="text-muted-foreground mt-2">
                Your early collection request has been sent to your Barangay for review.
              </p>
              <div className="mt-6 p-4 rounded-lg bg-muted">
                <p className="text-sm font-medium">What happens next?</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1 text-left">
                  <li>1. Barangay validates your request</li>
                  <li>2. Request is forwarded to MENRO</li>
                  <li>3. MENRO assigns a driver</li>
                  <li>4. You'll be notified when truck is on the way</li>
                </ul>
              </div>
              <Button className="w-full mt-6" onClick={() => {
                setSubmitted(false);
                setPhoto(null);
                setNotes('');
              }}>
                Submit Another Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </CitizenLayout>
    );
  }

  return (
    <CitizenLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 max-w-xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Early Collection Request</h1>
          <p className="text-muted-foreground">Request garbage pickup before scheduled day</p>
        </div>

        {/* Info Card */}
        <Card className="card-eco border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-primary">How it works</p>
                <p className="text-muted-foreground mt-1">
                  Take a photo of your garbage as proof. Your barangay will validate and forward to MENRO once enough requests are collected.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photo Section */}
        <Card className="card-eco">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Photo Proof *
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isCapturing ? (
              <div className="relative rounded-lg overflow-hidden bg-black">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                  <Button onClick={handleCapturePhoto} size="lg" className="rounded-full w-16 h-16">
                    <Camera className="w-6 h-6" />
                  </Button>
                  <Button onClick={handleStopCamera} variant="outline" size="icon" className="rounded-full">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ) : photo ? (
              <div className="relative rounded-lg overflow-hidden">
                <img src={photo} alt="Garbage proof" className="w-full aspect-video object-cover" />
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute top-2 right-2 rounded-full"
                  onClick={() => setPhoto(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 h-20 flex-col gap-1"
                  onClick={handleStartCamera}
                >
                  <Camera className="w-6 h-6" />
                  <span className="text-xs">Take Photo</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 h-20 flex-col gap-1"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="w-6 h-6" />
                  <span className="text-xs">Upload</span>
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
            )}
            <p className="text-xs text-muted-foreground text-center">
              Take a clear photo showing the volume of your garbage
            </p>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="card-eco">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Pickup Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-3 rounded-lg bg-muted flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Purok 5, Block 3</p>
                <p className="text-sm text-muted-foreground">Brgy. San Jose</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="card-eco">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Any additional information (e.g., event waste, multiple bags, etc.)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          className="w-full h-12" 
          onClick={handleSubmit}
          disabled={isSubmitting || !photo}
        >
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</>
          ) : (
            <><Send className="w-4 h-4 mr-2" />Submit Request</>
          )}
        </Button>
      </div>
    </CitizenLayout>
  );
}
