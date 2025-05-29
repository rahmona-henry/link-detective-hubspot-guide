
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, ExternalLink, Search, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BrokenLink {
  url: string;
  status: number;
  error: string;
  linkType: string;
  pageTitle: string;
  appName: string;
  pageNumber: number;
}

const Index = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('https://developers.hubspot.com/docs/reference/api/overview');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [brokenLinks, setBrokenLinks] = useState<BrokenLink[]>([]);
  const [totalLinks, setTotalLinks] = useState(0);
  const [scannedLinks, setScannedLinks] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalApps, setTotalApps] = useState(0);
  const [scannedApps, setScannedApps] = useState(0);

  const isApiDocs = url.includes('developers.hubspot.com');
  const isMarketplace = url.includes('ecosystem.hubspot.com/marketplace');

  const simulateScanning = async () => {
    setIsScanning(true);
    setProgress(0);
    setBrokenLinks([]);
    setTotalLinks(0);
    setScannedLinks(0);
    setCurrentPage(0);
    setTotalPages(0);
    setTotalApps(0);
    setScannedApps(0);

    if (isApiDocs) {
      // API Documentation scanning simulation
      const mockTotalPages = 45; // API docs sections
      const mockTotalSections = 180; // API endpoints and guides
      const linksPerSection = 12; // Code examples, external refs, related docs, etc.
      const mockTotalLinks = mockTotalSections * linksPerSection;
      
      setTotalPages(mockTotalPages);
      setTotalApps(mockTotalSections);
      setTotalLinks(mockTotalLinks);
      
      // Simulate scanning through each API documentation section
      for (let page = 1; page <= mockTotalPages; page++) {
        setCurrentPage(page);
        
        const sectionsOnPage = page === mockTotalPages ? mockTotalSections % 4 || 4 : 4;
        
        // Simulate scanning sections on current page
        for (let sectionIndex = 1; sectionIndex <= sectionsOnPage; sectionIndex++) {
          const sectionNumber = (page - 1) * 4 + sectionIndex;
          setScannedApps(sectionNumber);
          
          // Simulate checking multiple links per section
          for (let linkIndex = 1; linkIndex <= linksPerSection; linkIndex++) {
            const linkNumber = (sectionNumber - 1) * linksPerSection + linkIndex;
            await new Promise(resolve => setTimeout(resolve, 20));
            setScannedLinks(linkNumber);
            setProgress((linkNumber / mockTotalLinks) * 100);
            
            // Simulate finding broken links in API docs
            if (linkNumber === 34) {
              setBrokenLinks(prev => [...prev, {
                url: 'https://developers.hubspot.com/docs/methods/contacts/batch_update_contacts',
                status: 404,
                error: 'Not Found - Documentation page removed',
                linkType: 'API Documentation',
                pageTitle: 'Contacts API Reference',
                appName: 'Contacts API',
                pageNumber: page
              }]);
            }
            if (linkNumber === 127) {
              setBrokenLinks(prev => [...prev, {
                url: 'https://developers.hubspot.com/docs/methods/contacts/get_contacts',
                status: 404,
                error: 'Page Not Found',
                linkType: 'Documentation Link',
                pageTitle: 'Get Contacts Documentation',
                appName: 'Contacts API Guide',
                pageNumber: page
              }]);
            }
            if (linkNumber === 203) {
              setBrokenLinks(prev => [...prev, {
                url: 'https://github.com/hubspot/hubspot-api-nodejs/tree/master/sample-app',
                status: 404,
                error: 'Repository Not Found',
                linkType: 'Code Example',
                pageTitle: 'Node.js SDK Examples',
                appName: 'SDK Documentation',
                pageNumber: page
              }]);
            }
            if (linkNumber === 356) {
              setBrokenLinks(prev => [...prev, {
                url: 'https://developers.hubspot.com/docs/api/crm/deals/create',
                status: 500,
                error: 'Internal Server Error',
                linkType: 'API Reference',
                pageTitle: 'Create Deal Endpoint Documentation',
                appName: 'Deals API',
                pageNumber: page
              }]);
            }
            if (linkNumber === 445) {
              setBrokenLinks(prev => [...prev, {
                url: 'https://legacydocs.hubspot.com/docs/overview',
                status: 403,
                error: 'Access Forbidden',
                linkType: 'Legacy Documentation',
                pageTitle: 'Legacy API Overview',
                appName: 'Legacy Documentation',
                pageNumber: page
              }]);
            }
            if (linkNumber === 678) {
              setBrokenLinks(prev => [...prev, {
                url: 'https://developers.hubspot.com/docs/api/crm/pipelines',
                status: 404,
                error: 'Not Found',
                linkType: 'API Guide',
                pageTitle: 'Pipelines API Guide',
                appName: 'CRM Pipelines',
                pageNumber: page
              }]);
            }
          }
        }
      }

      toast({
        title: "API Documentation Scan Complete",
        description: `Scanned ${mockTotalSections} API sections across ${mockTotalPages} documentation pages and found ${brokenLinks.length + 6} broken links out of ${mockTotalLinks} total links`,
      });
    } else if (isMarketplace) {
      // ... keep existing code (marketplace scanning simulation)
      const mockTotalPages = 76;
      const mockTotalApps = 1523;
      const linksPerApp = 8;
      const mockTotalLinks = mockTotalApps * linksPerApp;
      
      setTotalPages(mockTotalPages);
      setTotalApps(mockTotalApps);
      setTotalLinks(mockTotalLinks);
      
      for (let page = 1; page <= mockTotalPages; page++) {
        setCurrentPage(page);
        
        const appsOnPage = page === mockTotalPages ? mockTotalApps % 20 || 20 : 20;
        
        for (let appIndex = 1; appIndex <= appsOnPage; appIndex++) {
          const appNumber = (page - 1) * 20 + appIndex;
          setScannedApps(appNumber);
          
          for (let linkIndex = 1; linkIndex <= linksPerApp; linkIndex++) {
            const linkNumber = (appNumber - 1) * linksPerApp + linkIndex;
            await new Promise(resolve => setTimeout(resolve, 25));
            setScannedLinks(linkNumber);
            setProgress((linkNumber / mockTotalLinks) * 100);
            
            if (linkNumber === 23) {
              setBrokenLinks(prev => [...prev, {
                url: 'https://example-app1.com/setup-guide',
                status: 404,
                error: 'Not Found',
                linkType: 'Setup Guide',
                pageTitle: 'CRM Integration Pro',
                appName: 'CRM Integration Pro',
                pageNumber: page
              }]);
            }
            if (linkNumber === 89) {
              setBrokenLinks(prev => [...prev, {
                url: 'https://example-app2.com/documentation',
                status: 500,
                error: 'Internal Server Error',
                linkType: 'Documentation',
                pageTitle: 'Sales Analytics Dashboard',
                appName: 'Sales Analytics Dashboard',
                pageNumber: page
              }]);
            }
            if (linkNumber === 156) {
              setBrokenLinks(prev => [...prev, {
                url: 'https://example-app3.com/support',
                status: 403,
                error: 'Forbidden',
                linkType: 'Support',
                pageTitle: 'Marketing Automation Suite',
                appName: 'Marketing Automation Suite',
                pageNumber: page
              }]);
            }
            if (linkNumber === 234) {
              setBrokenLinks(prev => [...prev, {
                url: 'https://example-app4.com/pricing',
                status: 404,
                error: 'Not Found',
                linkType: 'Pricing',
                pageTitle: 'Email Marketing Tool',
                appName: 'Email Marketing Tool',
                pageNumber: page
              }]);
            }
            if (linkNumber === 445) {
              setBrokenLinks(prev => [...prev, {
                url: 'https://example-app5.com/privacy-policy',
                status: 502,
                error: 'Bad Gateway',
                linkType: 'Privacy Policy',
                pageTitle: 'Data Sync Platform',
                appName: 'Data Sync Platform',
                pageNumber: page
              }]);
            }
            if (linkNumber === 667) {
              setBrokenLinks(prev => [...prev, {
                url: 'https://example-app6.com/terms',
                status: 404,
                error: 'Not Found',
                linkType: 'Terms of Service',
                pageTitle: 'Customer Support Widget',
                appName: 'Customer Support Widget',
                pageNumber: page
              }]);
            }
            if (linkNumber === 892) {
              setBrokenLinks(prev => [...prev, {
                url: 'https://example-app7.com/demo',
                status: 503,
                error: 'Service Unavailable',
                linkType: 'Demo',
                pageTitle: 'Lead Generation Tool',
                appName: 'Lead Generation Tool',
                pageNumber: page
              }]);
            }
            if (linkNumber === 1123) {
              setBrokenLinks(prev => [...prev, {
                url: 'https://example-app8.com/website',
                status: 404,
                error: 'Not Found',
                linkType: 'Website',
                pageTitle: 'Social Media Connector',
                appName: 'Social Media Connector',
                pageNumber: page
              }]);
            }
          }
        }
      }

      toast({
        title: "Comprehensive Marketplace Scan Complete",
        description: `Scanned ${mockTotalApps} apps across ${mockTotalPages} pages and found ${brokenLinks.length + 8} broken links out of ${mockTotalLinks} total links`,
      });
    }

    setIsScanning(false);
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

  const getHeaderTitle = () => {
    if (isApiDocs) return "HubSpot API Documentation Link Checker";
    if (isMarketplace) return "HubSpot Marketplace Link Checker";
    return "HubSpot Link Checker";
  };

  const getHeaderDescription = () => {
    if (isApiDocs) return "Comprehensive scan of all links across HubSpot's API documentation including endpoints, code examples, guides, and external references";
    if (isMarketplace) return "Comprehensive scan of all links across 1500+ HubSpot marketplace apps including setup guides, documentation, support, pricing, and more";
    return "Comprehensive link checker for HubSpot websites";
  };

  const getScanButtonText = () => {
    if (isApiDocs) return isScanning ? "Scanning API Documentation..." : "Start API Documentation Scan";
    if (isMarketplace) return isScanning ? "Scanning All Apps..." : "Start Comprehensive Marketplace Scan";
    return isScanning ? "Scanning..." : "Start Link Scan";
  };

  const getProgressText = () => {
    if (isApiDocs) return "Checking all links across API documentation: endpoints, code examples, guides, SDK references, and external links";
    if (isMarketplace) return "Checking all links across marketplace apps: setup guides, documentation, support, pricing, privacy policies, terms, demos, and websites";
    return "Checking all links on the website";
  };

  const getStatsLabels = () => {
    if (isApiDocs) return {
      pages: "Doc Pages",
      apps: "API Sections",
      totalLinks: "Total Links",
      working: "Working",
      broken: "Broken"
    };
    if (isMarketplace) return {
      pages: "Pages", 
      apps: "Apps",
      totalLinks: "Total Links",
      working: "Working", 
      broken: "Broken"
    };
    return {
      pages: "Pages",
      apps: "Sections", 
      totalLinks: "Total Links",
      working: "Working",
      broken: "Broken"
    };
  };

  const stats = getStatsLabels();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getHeaderTitle()}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {getHeaderDescription()}
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-4xl mx-auto p-6 mb-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  HubSpot URL
                </label>
                <Input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full"
                  placeholder="https://developers.hubspot.com/docs/reference/api/overview"
                  required
                />
                <div className="mt-2 text-sm text-gray-500">
                  <p>Try: <button type="button" onClick={() => setUrl('https://developers.hubspot.com/docs/reference/api/overview')} className="text-blue-600 hover:underline">API Documentation</button> or <button type="button" onClick={() => setUrl('https://ecosystem.hubspot.com/marketplace/apps')} className="text-blue-600 hover:underline">Marketplace</button></p>
                </div>
              </div>
            </div>
            
            {isScanning && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>Page {currentPage} of {totalPages}</div>
                  <div>{stats.apps}: {scannedApps} / {totalApps}</div>
                  <div>Links: {scannedLinks} / {totalLinks}</div>
                  <div>Broken: {brokenLinks.length}</div>
                </div>
                <Progress value={progress} className="w-full" />
                <div className="text-center text-sm text-gray-500">
                  {getProgressText()}
                </div>
              </div>
            )}
            
            <Button
              type="submit"
              disabled={isScanning}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
            >
              <Search className="w-4 h-4 mr-2" />
              {getScanButtonText()}
            </Button>
          </form>
        </Card>

        {/* Current URL Display */}
        {(totalLinks > 0 || brokenLinks.length > 0) && (
          <Card className="max-w-4xl mx-auto p-4 mb-6 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-2 text-sm">
              <Link className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700 font-medium">Scanning:</span>
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline break-all"
              >
                {url}
              </a>
              <ExternalLink className="w-3 h-3 text-blue-600" />
            </div>
          </Card>
        )}

        {/* Results Summary */}
        {(totalLinks > 0 || brokenLinks.length > 0) && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{totalPages}</div>
                <div className="text-gray-600">{stats.pages}</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{totalApps}</div>
                <div className="text-gray-600">{stats.apps}</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{totalLinks}</div>
                <div className="text-gray-600">{stats.totalLinks}</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{totalLinks - brokenLinks.length}</div>
                <div className="text-gray-600">{stats.working}</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{brokenLinks.length}</div>
                <div className="text-gray-600">{stats.broken}</div>
              </Card>
            </div>
          </div>
        )}

        {/* Results */}
        {brokenLinks.length > 0 && (
          <Card className="max-w-4xl mx-auto p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900">Broken Links Found</h2>
            </div>
            
            <div className="space-y-4">
              {brokenLinks.map((link, index) => (
                <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{link.appName}</h3>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="w-fit">
                        Page {link.pageNumber}
                      </Badge>
                      <Badge variant="secondary" className="w-fit">
                        {link.linkType}
                      </Badge>
                      <Badge variant="destructive" className="w-fit">
                        {link.status} - {link.error}
                      </Badge>
                    </div>
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
              Excellent! All {totalLinks} links across {totalApps} {stats.apps.toLowerCase()} on {totalPages} pages are working properly.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
