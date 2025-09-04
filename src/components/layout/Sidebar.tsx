import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  ShoppingCart, 
  Link as LinkIcon, 
  Wallet, 
  MessageCircle,
  Settings,
  LogOut 
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Link Market", href: "/market", icon: ShoppingCart },
  { name: "Satın Aldığınız Linkler", href: "/orders", icon: LinkIcon },
  { name: "Bakiye İşlemleri", href: "/wallet", icon: Wallet },
  { name: "İletişim", href: "/contact", icon: MessageCircle },
];

const bottomNavigation = [
  { name: "Ayarlar", href: "/settings", icon: Settings },
  { name: "Çıkış", href: "/logout", icon: LogOut },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center px-6 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground">LİNK</h1>
              <p className="text-sm font-semibold text-sidebar-foreground">PANELİ</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-lg"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="px-4 pb-4 space-y-2 border-t border-sidebar-border pt-4">
          {bottomNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center px-4 py-3 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-all duration-200"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}