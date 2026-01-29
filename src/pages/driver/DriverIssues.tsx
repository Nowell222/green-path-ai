import { useState, useRef } from 'react';
import DriverLayout from '@/components/layouts/DriverLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Camera, 
  AlertTriangle, 
  Send, 
  MapPin,
  Clock,
  CheckCircle,
  Loader2,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const issueTypes = [
  { id: 'road', label: 'Road Blocked', icon: '🚧' },
  { id: 'truck', label: 'Truck Problem', icon: '🚛' },
  { id: 'waste', label: 'Hazardous Waste', icon: '☢️' },
  { id: 'resident', label: 'Resident Issue', icon: '🏠' },
  { id: 'other', label: 'Other', icon: '📝' },
];

const recentIssues = [
  { id: 1, type: 'road', title: 'Road construction at Purok 3', time: '5:30 PM', status: 'resolved' },
  { id: 2, type: 'waste', title: 'Medical waste found in regular bin', time: 'Yesterday', status: 'resolved' },
];

export default function DriverIssues() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

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
    if (!selectedType) {
      toast.error('Please select an issue type');
      return;
    }
    if (!description.trim()) {
      toast.error('Please describe the issue');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Issue reported successfully!', {
      description: 'Dispatch has been notified'
    });
    
    // Reset form
    setSelectedType(null);
    setDescription('');
    setLocation('');
    setPhoto(null);
    setIsSubmitting(false);
  };

  return (
    <DriverLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-display font-bold">Report Issue</h1>

        {/* Issue Type Selection */}
        <Card className="card-eco">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Issue Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {issueTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={cn(
                    "p-3 rounded-lg border text-center transition-all",
                    selectedType === type.id 
                      ? "border-primary bg-primary/10" 
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <span className="text-2xl block mb-1">{type.icon}</span>
                  <span className="text-xs font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Issue Details */}
        <Card className="card-eco">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Current stop or address"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the issue in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            {/* Photo Section */}
            <div className="space-y-2">
              <Label>Photo Evidence</Label>
              
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
                  <img src={photo} alt="Captured" className="w-full aspect-video object-cover" />
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
                    className="flex-1"
                    onClick={handleStartCamera}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Upload
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
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          className="w-full h-12" 
          onClick={handleSubmit}
          disabled={isSubmitting || !selectedType || !description.trim()}
        >
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</>
          ) : (
            <><Send className="w-4 h-4 mr-2" />Submit Report</>
          )}
        </Button>

        {/* Recent Issues */}
        <Card className="card-eco">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentIssues.map((issue) => (
              <div 
                key={issue.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
              >
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                  {issueTypes.find(t => t.id === issue.type)?.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{issue.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {issue.time}
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-[hsl(var(--status-success))]" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DriverLayout>
  );
}
