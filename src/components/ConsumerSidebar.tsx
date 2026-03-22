import { ShoppingBasket, TrendingUp, ClipboardList, Home, Settings } from "lucide-react";
import { NavLink } from "./NavLink";
import { useLocation } from "react-router-dom";
import logo from "../assets/agrisync-logo.png";

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, SidebarHeader, useSidebar,
} from "./ui/sidebar";

const items = [
  { title: "Marketplace", url: "/marketplace", icon: ShoppingBasket },
  { title: "Price Trends", url: "/marketplace/trends", icon: TrendingUp },
  { title: "My Interests", url: "/marketplace/my-interests", icon: ClipboardList },
];

export function ConsumerSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <a href="/" className="flex items-center gap-2.5">
          <img src={logo} alt="AgriSync" className="w-7 h-7 shrink-0" />
          {!collapsed && <span className="font-bold text-foreground tracking-tight text-sm">AgriSync</span>}
        </a>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Consumer</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end={item.url === "/marketplace"} className="hover:bg-muted/50" activeClassName="bg-muted text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" end className="hover:bg-muted/50" activeClassName="bg-muted text-primary font-medium">
                    <Home className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Home</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/dashboard" className="hover:bg-muted/50" activeClassName="bg-muted text-primary font-medium">
                    <Settings className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Farmer Platform</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Consumer Portal</p>
            <p>Prices updated: 1h ago</p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
