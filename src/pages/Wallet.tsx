import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Plus, Upload, Clock, CheckCircle, XCircle, CreditCard, Bitcoin, FileText } from "lucide-react";

const transactionHistory = [
  {
    id: 1,
    type: "credit_purchase",
    amount: 100,
    currency: "₺",
    method: "Bitcoin",
    status: "completed",
    date: "2024-01-15 14:30",
    txHash: "abc123...xyz789"
  },
  {
    id: 2,
    type: "link_purchase",
    amount: -25,
    currency: "₺",
    method: "Kredi",
    status: "completed",
    date: "2024-01-14 09:15",
    description: "techblog.com footer pozisyonu"
  },
  {
    id: 3,
    type: "manual_payment",
    amount: 50,
    currency: "₺",
    method: "Manuel Transfer",
    status: "pending",
    date: "2024-01-13 16:45",
    description: "Bekleyen onay"
  }
];

export default function Wallet() {
  const [manualPayment, setManualPayment] = useState({
    network: "",
    amount: "",
    txHash: "",
    note: "",
    evidence: null as File | null
  });

  const handleManualPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle manual payment notification
    console.log("Manual payment notification:", manualPayment);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setManualPayment({...manualPayment, evidence: file});
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-warning" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/10 text-success">Tamamlandı</Badge>;
      case 'pending':
        return <Badge className="bg-warning/10 text-warning">Beklemede</Badge>;
      case 'failed':
        return <Badge className="bg-destructive/10 text-destructive">Başarısız</Badge>;
      default:
        return <Badge variant="outline">Bilinmeyen</Badge>;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header />
        
        <main className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Cüzdan</h1>
              <p className="text-muted-foreground">Bakiye yönetimi ve işlem geçmişi</p>
            </div>
          </div>

          {/* Balance Card */}
          <Card className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 mb-2">Toplam Bakiye</p>
                  <h2 className="text-4xl font-bold">1₺</h2>
                  <p className="text-primary-foreground/80 mt-2">≈ 0.033 USD</p>
                </div>
                <div className="text-right">
                  <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <Button 
                    variant="secondary" 
                    className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 border-none"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Kredi Ekle
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Purchase */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Bitcoin className="w-5 h-5 mr-2" />
                  Kripto ile Kredi Satın Al
                </CardTitle>
                <CardDescription>
                  Bitcoin, Ethereum ve diğer kripto paralarla anında kredi satın alın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-16 flex-col">
                    <span className="text-lg font-bold">50₺</span>
                    <span className="text-xs text-muted-foreground">≈ 1.67 USD</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <span className="text-lg font-bold">100₺</span>
                    <span className="text-xs text-muted-foreground">≈ 3.33 USD</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <span className="text-lg font-bold">250₺</span>
                    <span className="text-xs text-muted-foreground">≈ 8.33 USD</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <span className="text-lg font-bold">500₺</span>
                    <span className="text-xs text-muted-foreground">≈ 16.67 USD</span>
                  </Button>
                </div>
                <Button variant="gradient" className="w-full" size="lg">
                  <Bitcoin className="w-5 h-5 mr-2" />
                  Kripto Ödeme Sayfasına Git
                </Button>
              </CardContent>
            </Card>

            {/* Manual Payment Notification */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <FileText className="w-5 h-5 mr-2" />
                  Ödeme Bildirimi Yap
                </CardTitle>
                <CardDescription>
                  Manuel ödeme yaptıysanız aşağıdaki formu doldurun
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleManualPaymentSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="network">Ağ</Label>
                      <Select value={manualPayment.network} onValueChange={(value) => setManualPayment({...manualPayment, network: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                          <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                          <SelectItem value="usdt">Tether (USDT)</SelectItem>
                          <SelectItem value="other">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="amount">Tutar (₺)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="100"
                        value={manualPayment.amount}
                        onChange={(e) => setManualPayment({...manualPayment, amount: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="txHash">Transaction Hash</Label>
                    <Input
                      id="txHash"
                      placeholder="0x..."
                      value={manualPayment.txHash}
                      onChange={(e) => setManualPayment({...manualPayment, txHash: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="evidence">Ekran Görüntüsü (Opsiyonel)</Label>
                    <Input
                      id="evidence"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="note">Açıklama</Label>
                    <Textarea
                      id="note"
                      placeholder="Ek bilgiler..."
                      value={manualPayment.note}
                      onChange={(e) => setManualPayment({...manualPayment, note: e.target.value})}
                    />
                  </div>

                  <Button type="submit" variant="gradient" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Bildirimi Gönder
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">İşlem Geçmişi</CardTitle>
              <CardDescription>Son 30 günlük işlemleriniz</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactionHistory.map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(transaction.status)}
                      <div>
                        <p className="font-medium text-foreground">
                          {transaction.type === 'credit_purchase' && 'Kredi Satın Alımı'}
                          {transaction.type === 'link_purchase' && 'Link Satın Alımı'}
                          {transaction.type === 'manual_payment' && 'Manuel Ödeme'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.description || `${transaction.method} • ${transaction.date}`}
                        </p>
                        {transaction.txHash && (
                          <p className="text-xs text-primary font-mono">{transaction.txHash}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex items-center space-x-3">
                      <div>
                        <p className={`font-bold ${transaction.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount}{transaction.currency}
                        </p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}