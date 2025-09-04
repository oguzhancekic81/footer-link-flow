import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { ExternalLink, Eye, Clock, CheckCircle, XCircle, RefreshCw, Calendar } from "lucide-react";

const orders = [
  {
    id: 1,
    domain: "techblog.com",
    url: "https://example.com",
    anchor: "En iyi teknoloji rehberi",
    status: "live",
    startDate: "2024-01-10",
    endDate: "2024-02-10",
    duration: 30,
    price: 25,
    position: "Footer",
    lastCheck: "2024-01-15 14:30",
    checkStatus: "verified"
  },
  {
    id: 2,
    domain: "businessnews.co",
    url: "https://mybusiness.com",
    anchor: "İş dünyası haberlereri",
    status: "pending",
    startDate: "2024-01-14",
    endDate: "2024-02-14",
    duration: 30,
    price: 45,
    position: "Footer",
    queuePosition: 2,
    estimatedStart: "2024-01-16"
  },
  {
    id: 3,
    domain: "healthguide.net",
    url: "https://health-tips.com",
    anchor: "Sağlık rehberi",
    status: "expired",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    duration: 30,
    price: 15,
    position: "Footer",
    lastCheck: "2023-12-31 23:59",
    checkStatus: "removed"
  },
  {
    id: 4,
    domain: "example-rejected.com",
    url: "https://rejected.com",
    anchor: "Reddedilen link",
    status: "rejected",
    startDate: "2024-01-12",
    endDate: "2024-02-12",
    duration: 30,
    price: 20,
    position: "Footer",
    rejectionReason: "Uygun olmayan içerik tespit edildi"
  }
];

export default function Orders() {
  const [activeTab, setActiveTab] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-success/10 text-success">Yayında</Badge>;
      case 'pending':
        return <Badge className="bg-warning/10 text-warning">Beklemede</Badge>;
      case 'expired':
        return <Badge className="bg-muted/50 text-muted-foreground">Süresi Doldu</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive/10 text-destructive">Reddedildi</Badge>;
      case 'refunded':
        return <Badge className="bg-blue-500/10 text-blue-500">İade Edildi</Badge>;
      default:
        return <Badge variant="outline">Bilinmeyen</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-warning" />;
      case 'expired':
        return <Calendar className="w-5 h-5 text-muted-foreground" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <RefreshCw className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header />
        
        <main className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Siparişlerim</h1>
              <p className="text-muted-foreground">Satın aldığınız backlink pozisyonları</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Toplam Sipariş</p>
              <p className="text-2xl font-bold text-foreground">{orders.length}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Yayında</p>
                    <p className="text-2xl font-bold text-success">{orders.filter(o => o.status === 'live').length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Beklemede</p>
                    <p className="text-2xl font-bold text-warning">{orders.filter(o => o.status === 'pending').length}</p>
                  </div>
                  <Clock className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Süresi Doldu</p>
                    <p className="text-2xl font-bold text-muted-foreground">{orders.filter(o => o.status === 'expired').length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Toplam Harcama</p>
                    <p className="text-2xl font-bold text-foreground">{orders.reduce((sum, o) => sum + o.price, 0)}₺</p>
                  </div>
                  <RefreshCw className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders List */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Sipariş Listesi</CardTitle>
              <CardDescription>Tüm siparişlerinizi buradan takip edebilirsiniz</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">Tümü</TabsTrigger>
                  <TabsTrigger value="live">Yayında</TabsTrigger>
                  <TabsTrigger value="pending">Beklemede</TabsTrigger>
                  <TabsTrigger value="expired">Süresi Doldu</TabsTrigger>
                  <TabsTrigger value="rejected">Reddedildi</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                  <div className="space-y-4">
                    {filteredOrders.map((order) => (
                      <div key={order.id} className="border border-border rounded-lg p-6 bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            {getStatusIcon(order.status)}
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-semibold text-foreground">{order.domain}</h3>
                                {getStatusBadge(order.status)}
                                <Badge variant="outline" className="text-xs">{order.position}</Badge>
                              </div>
                              
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center space-x-2">
                                  <span className="text-muted-foreground">URL:</span>
                                  <a 
                                    href={order.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary-glow flex items-center"
                                  >
                                    {order.url}
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                  </a>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <span className="text-muted-foreground">Anchor:</span>
                                  <span className="text-foreground font-medium">"{order.anchor}"</span>
                                </div>

                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-muted-foreground">Süre:</span>
                                    <span>{order.duration} gün</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-muted-foreground">Fiyat:</span>
                                    <span className="font-semibold">{order.price}₺</span>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-muted-foreground">Başlangıç:</span>
                                    <span>{order.startDate}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-muted-foreground">Bitiş:</span>
                                    <span>{order.endDate}</span>
                                  </div>
                                </div>

                                {/* Status specific info */}
                                {order.status === 'pending' && order.queuePosition && (
                                  <div className="flex items-center space-x-2 text-warning">
                                    <span>Sırada: {order.queuePosition}. pozisyon</span>
                                    {order.estimatedStart && (
                                      <span>• Tahmini başlangıç: {order.estimatedStart}</span>
                                    )}
                                  </div>
                                )}

                                {order.status === 'live' && order.lastCheck && (
                                  <div className="flex items-center space-x-2 text-success">
                                    <span>Son kontrol: {order.lastCheck}</span>
                                    <span>• Durum: Doğrulandı</span>
                                  </div>
                                )}

                                {order.status === 'rejected' && order.rejectionReason && (
                                  <div className="text-destructive">
                                    <span>Red nedeni: {order.rejectionReason}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {order.status === 'live' && (
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                Önizle
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              Detaylar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {filteredOrders.length === 0 && (
                      <div className="text-center py-12">
                        <RefreshCw className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Henüz sipariş yok
                        </h3>
                        <p className="text-muted-foreground">
                          İlk siparişinizi vermek için market sayfasını ziyaret edin.
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}