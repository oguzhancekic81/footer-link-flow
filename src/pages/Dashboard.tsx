import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Plus, ShoppingCart, Link as LinkIcon, TrendingUp, Bell, Wallet, FileText } from "lucide-react";

const dashboardStats = [
  {
    title: "Bakiye",
    value: "0₺",
    description: "Mevcut Kredi",
    icon: Wallet,
    gradient: "from-primary to-primary-glow"
  },
  {
    title: "Satın Aldığınız Linkler",
    value: "0",
    description: "Aktif Siparişler",
    icon: ShoppingCart,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Aktif Linklerin",
    value: "0",
    description: "Yayında Olan",
    icon: LinkIcon,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Toplam Harcama",
    value: "0₺",
    description: "Tüm Zamanlar",
    icon: TrendingUp,
    gradient: "from-purple-500 to-pink-500"
  }
];

const recentActivity = [
  {
    id: 1,
    type: "link_purchase",
    title: "Link satın alımı",
    description: "example.com footer pozisyonu",
    time: "2 saat önce",
    status: "success"
  },
  {
    id: 2,
    type: "credit_add",
    title: "Kredi eklendi",
    description: "Manuel ödeme onaylandı",
    time: "1 gün önce",
    status: "success"
  },
  {
    id: 3,
    type: "link_expired", 
    title: "Link süresi doldu",
    description: "sample.com footer pozisyonu",
    time: "3 gün önce",
    status: "warning"
  }
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header />
        
        <main className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary to-primary-glow rounded-xl p-6 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Hoşgeldiniz @nariyuka</h1>
                <p className="text-primary-foreground/90 mb-4">Toplam Bakiyeniz</p>
                <p className="text-3xl font-bold">1₺</p>
              </div>
              <div className="text-right">
                <div className="w-20 h-20 bg-primary-foreground/20 rounded-full flex items-center justify-center mb-4">
                  <Wallet className="w-8 h-8" />
                </div>
                <Button variant="secondary" className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 border-none">
                  Bakiye Ekle
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardStats.map((stat, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Hızlı İşlemler</CardTitle>
                <CardDescription>Sık kullanılan eylemler</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="gradient" className="w-full justify-start" size="lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Kredi Satın Al
                </Button>
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Market'i Keşfet
                </Button>
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <FileText className="w-5 h-5 mr-2" />
                  Ödeme Bildirimi Yap
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Son Aktiviteler</CardTitle>
                <CardDescription>Son işlemleriniz</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-success' : 
                        activity.status === 'warning' ? 'bg-warning' : 'bg-muted-foreground'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {activity.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* GreenLink Announcements */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Bell className="w-5 h-5 mr-2" />
                GreenLink Duyurular
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-1">Platform Güncellemesi</h4>
                  <p className="text-sm text-muted-foreground">
                    Yeni ödeme yöntemleri ve gelişmiş raporlama özellikleri eklendi.
                  </p>
                  <span className="text-xs text-primary">2 gün önce</span>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-1">Bakım Bildirimi</h4>
                  <p className="text-sm text-muted-foreground">
                    Sistem bakımı 25 Aralık 02:00-04:00 saatleri arasında gerçekleştirilecek.
                  </p>
                  <span className="text-xs text-muted-foreground">1 hafta önce</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}