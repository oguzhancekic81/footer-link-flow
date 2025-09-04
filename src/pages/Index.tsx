import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link as LinkIcon, TrendingUp, Shield, Zap, Users, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">LİNK PANELİ</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Giriş Yap</Button>
              </Link>
              <Link to="/register">
                <Button variant="gradient">Kayıt Ol</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Footer Backlink
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow"> Marketplace</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Yüksek kaliteli backlink pozisyonları satın alın. Kripto ile ödeme yapın, 
            otomatik link yerleşimi ile hemen yayına başlayın.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/market">
              <Button variant="gradient" size="xl" className="min-w-[200px]">
                Market'i Keşfet
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="xl" className="min-w-[200px]">
                Giriş Yap
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Aktif Site</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Başarılı Link</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Neden Link Paneli?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Modern, güvenli ve otomatik backlink yönetimi için ihtiyacınız olan her şey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-foreground">Otomatik Yerleşim</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Satın aldığınız linkler otomatik olarak footer'a eklenir ve süre sonunda kaldırılır.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-foreground">Kripto Ödeme</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Bitcoin, Ethereum ve diğer kripto paralarla güvenli ödeme imkanı.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-foreground">Kaliteli Siteler</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Yüksek DA/DR değerine sahip, kaliteli ve organik trafikli siteler.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-foreground">7/24 Destek</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Uzman ekibimiz her zaman yardımınıza hazır. Canlı destek ve hızlı çözüm.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-primary to-primary-glow rounded-2xl p-12 text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Backlink Stratejinizi Güçlendirin
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Hemen başlayın ve SEO performansınızı artırın
            </p>
            <Link to="/register">
              <Button variant="secondary" size="xl" className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 border-none">
                Ücretsiz Hesap Aç
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <LinkIcon className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Link Paneli</span>
            </div>
            <div className="text-muted-foreground text-sm">
              © 2024 Link Paneli. Tüm hakları saklıdır.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
