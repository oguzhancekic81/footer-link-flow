import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Search, Filter, Star, TrendingUp, Globe, Clock, ShoppingCart } from "lucide-react";

const marketItems = [
  {
    id: 1,
    domain: "techblog.com",
    da: 65,
    traffic: "50K+",
    category: "Teknoloji",
    country: "TR",
    language: "Türkçe",
    slots: 3,
    duration: "30 gün",
    price: 25,
    currency: "₺",
    isIndexed: true,
    description: "Teknoloji odaklı yüksek trafikli blog sitesi"
  },
  {
    id: 2,
    domain: "businessnews.co",
    da: 72,
    traffic: "100K+",
    category: "İş Dünyası",
    country: "US",
    language: "İngilizce",
    slots: 5,
    duration: "30 gün",
    price: 45,
    currency: "₺",
    isIndexed: true,
    description: "Global iş dünyası haberleri ve analizleri"
  },
  {
    id: 3,
    domain: "healthguide.net",
    da: 58,
    traffic: "25K+",
    category: "Sağlık",
    country: "TR",
    language: "Türkçe",
    slots: 2,
    duration: "15 gün",
    price: 15,
    currency: "₺",
    isIndexed: true,
    description: "Sağlık ve yaşam rehberi platformu"
  },
  {
    id: 4,
    domain: "travelexplorer.org",
    da: 61,
    traffic: "75K+",
    category: "Seyahat",
    country: "TR",
    language: "Türkçe",
    slots: 4,
    duration: "45 gün",
    price: 35,
    currency: "₺",
    isIndexed: true,
    description: "Seyahat rehberi ve öneriler sitesi"
  }
];

export default function Market() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minDA: "",
    maxPrice: "",
    language: "",
    country: ""
  });

  const filteredItems = marketItems.filter(item => {
    return (
      item.domain.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.category === "" || item.category === filters.category) &&
      (filters.language === "" || item.language === filters.language) &&
      (filters.country === "" || item.country === filters.country)
    );
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
              <h1 className="text-3xl font-bold text-foreground">Link Market</h1>
              <p className="text-muted-foreground">Yüksek kaliteli backlink pozisyonları keşfedin</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Toplam Site</p>
              <p className="text-2xl font-bold text-foreground">{marketItems.length}</p>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Filter className="w-5 h-5 mr-2" />
                Filtreler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="lg:col-span-2">
                  <Label htmlFor="search">Domain Arama</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Domain adı girin..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tümü" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tümü</SelectItem>
                      <SelectItem value="Teknoloji">Teknoloji</SelectItem>
                      <SelectItem value="İş Dünyası">İş Dünyası</SelectItem>
                      <SelectItem value="Sağlık">Sağlık</SelectItem>
                      <SelectItem value="Seyahat">Seyahat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="language">Dil</Label>
                  <Select value={filters.language} onValueChange={(value) => setFilters({...filters, language: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tümü" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tümü</SelectItem>
                      <SelectItem value="Türkçe">Türkçe</SelectItem>
                      <SelectItem value="İngilizce">İngilizce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="country">Ülke</Label>
                  <Select value={filters.country} onValueChange={(value) => setFilters({...filters, country: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tümü" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tümü</SelectItem>
                      <SelectItem value="TR">Türkiye</SelectItem>
                      <SelectItem value="US">ABD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price">Max Fiyat (₺)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="100"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="bg-card border-border hover:shadow-lg transition-all duration-200 group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.domain}
                    </CardTitle>
                    {item.isIndexed && (
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        İndeksli
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">DA: {item.da}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{item.traffic}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.language}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.country}
                    </Badge>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Mevcut Slot:</span>
                      <span className="font-medium text-foreground">{item.slots}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Süre:</span>
                      <span className="font-medium text-foreground">{item.duration}</span>
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-2xl font-bold text-primary">{item.price}{item.currency}</span>
                      <span className="text-sm text-muted-foreground ml-1">/ {item.duration}</span>
                    </div>
                    <Button variant="gradient" size="sm">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Satın Al
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <Card className="bg-card border-border">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Sonuç bulunamadı</h3>
                <p className="text-muted-foreground text-center">
                  Arama kriterlerinizi değiştirip tekrar deneyin.
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}