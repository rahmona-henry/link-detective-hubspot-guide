
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, ExternalLink, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BrokenLink {
  url: string;
  status: number;
  error: string;
  pageTitle: string;
  appName: string;
}

const Index = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('https://ecosystem.hubspot.com/marketplace/apps');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [brokenLinks, setBrokenLinks] = useState<BrokenLink[]>([]);
  const [totalLinks, setTotalLinks] = useState(0);
  const [scannedLinks, setScannedLinks] = useState(0);

  const simulateScanning = async () => {
    setIsScanning(true);
    setProgress(0);
    setBrokenLinks([]);
    setTotalLinks(0);
    setScannedLinks(0);

    // Simulate finding links
    const mockTotalLinks = 45;
    setTotalLinks(mockTotalLinks);
    
    // Simulate scanning progress
    for (let i = 0; i <= mockTotalLinks; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setScannedLinks(i);
      setProgress((i / mockTotalLinks) * 100);
      
      // Simulate finding some broken links
      if (i === 12) {
        setBrokenLinks(prev => [...prev, {
          url: 'https://example-app1.com/setup-guide',
          status: 404,
          error: 'Not Found',
          pageTitle: 'CRM Integration Pro',
          appName: 'CRM Integration Pro'
        }]);
      }
      if (i === 28) {
        setBrokenLinks(prev => [...prev, {
          url: 'https://example-app2.com/getting-started',
          status: 500,
          error: 'Internal Server Error',
          pageTitle: 'Sales Analytics Dashboard',
          appName: 'Sales Analytics Dashboard'
        }]);
      }
      if (i === 37) {
        setBrokenLinks(prev => [...prev, {
          url: 'https://example-app3.com/setup',
          status: 403,
          error: 'Forbidden',
          pageTitle: 'Marketing Automation Suite',
          appName: 'Marketing Automation Suite'
        }]);
      }
    }

    setIsScanning(false);
    
    toast({
      title: "Scan Complete",
      description: `Found ${brokenLinks.length + 3} broken links out of ${mockTotalLinks} total links`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }
    simulateScanning();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            HubSpot Setup Guide Link Checker
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scan the HubSpot marketplace to find broken Setup guide links and ensure a smooth user experience
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-4xl mx-auto p-6 mb-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  HubSpot Marketplace URL
                </label>
                <Input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full"
                  placeholder="https://ecosystem.hubspot.com/marketplace/apps"
                  required
                />
              </div>
            </div>
            
            {isScanning && (
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Scanning links...</span>
                  <span>{scannedLinks} / {totalLinks} links checked</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}
            
            <Button
              type="submit"
              disabled={isScanning}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
            >
              <Search className="w-4 h-4 mr-2" />
              {isScanning ? "Scanning..." : "Start Scan"}
            </Button>
          </form>
        </Card>

        {/* Results Summary */}
        {(totalLinks > 0 || brokenLinks.length > 0) && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{totalLinks}</div>
                <div className="text-gray-600">Total Links</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{totalLinks - brokenLinks.length}</div>
                <div className="text-gray-600">Working Links</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{brokenLinks.length}</div>
                <div className="text-gray-600">Broken Links</div>
              </Card>
            </div>
          </div>
        )}

        {/* Results */}
        {brokenLinks.length > 0 && (
          <Card className="max-w-4xl mx-auto p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900">Broken Setup Guide Links</h2>
            </div>
            
            <div className="space-y-4">
              {brokenLinks.map((link, index) => (
                <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{link.appName}</h3>
                    <Badge variant="destructive" className="w-fit">
                      {link.status} - {link.error}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ExternalLink className="w-4 h-4" />
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 underline break-all"
                    >
                      {link.url}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* No broken links message */}
        {!isScanning && totalLinks > 0 && brokenLinks.length === 0 && (
          <Card className="max-w-4xl mx-auto p-8 text-center shadow-lg">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">All Links Working!</h2>
            <p className="text-gray-600">
              Great news! All {totalLinks} Setup guide links are working properly.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
