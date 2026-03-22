import { Link } from "react-router-dom";
import logo from "@/assets/agrisync-logo.png";

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-14">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="AgriSync" className="w-7 h-7" />
          <span className="font-bold text-foreground tracking-tight">AgriSync</span>
        </a>
        <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/dashboard" className="hover:text-foreground transition-colors">Farmer Platform</Link>
          <Link to="/marketplace" className="hover:text-foreground transition-colors">Marketplace</Link>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <Link
            to="/marketplace"
            className="px-4 py-1.5 rounded-md bg-secondary text-secondary-foreground font-medium text-sm transition-[box-shadow,transform] hover:shadow-md hover:shadow-secondary/20 active:scale-[0.97]"
          >
            Buy Crops
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-1.5 rounded-md bg-primary text-primary-foreground font-medium text-sm transition-[box-shadow,transform] hover:shadow-md hover:shadow-primary/20 active:scale-[0.97]"
          >
            I'm a Farmer
          </Link>
        </div>
      </div>
    </nav>
  );
}
