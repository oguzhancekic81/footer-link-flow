import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link as LinkIcon, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center shadow-lg">
              <LinkIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">LİNK</h1>
              <p className="text-lg font-semibold text-foreground">PANELİ</p>
            </div>
          </div>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-foreground">
              Link Paneline Hoş geldiniz
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Kullanıcı Adınız ve Şifreniz ile Giriş Yapınız..
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground font-medium">
                  E-posta veya Kullanıcı Adı
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="kullanici@email.com"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Şifre
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground pr-10"
                    required
                    minLength={6}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={formData.remember}
                  onCheckedChange={(checked) => setFormData({...formData, remember: !!checked})}
                />
                <Label htmlFor="remember" className="text-sm text-muted-foreground">
                  Beni Hatırla
                </Label>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                Giriş Yap
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 pt-2">
            <p className="text-sm text-muted-foreground text-center">
              Henüz Sistemimize Katılmadın mı?{" "}
              <Link to="/register" className="text-primary hover:text-primary-glow font-medium">
                Kayıt Ol
              </Link>
            </p>
            <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-glow">
              Şifremi Unuttum
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}