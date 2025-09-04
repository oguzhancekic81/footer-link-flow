import { Button } from "@/components/ui/button";
import { Bell, User, Sun } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Balance */}
          <div className="bg-gradient-to-r from-primary to-primary-glow px-4 py-2 rounded-lg">
            <span className="text-primary-foreground font-semibold">Bakiyeniz: 1₺</span>
          </div>
          
          {/* Theme toggle */}
          <Button variant="ghost" size="icon">
            <Sun className="w-5 h-5" />
          </Button>
          
          {/* Notifications */}
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          
          {/* Profile */}
          <Button variant="ghost" size="icon">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}