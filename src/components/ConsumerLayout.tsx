import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { ConsumerSidebar } from "./ConsumerSidebar";
import { Outlet } from "react-router-dom";

export default function ConsumerLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ConsumerSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b border-border bg-card/50 backdrop-blur-sm px-4 shrink-0">
            <SidebarTrigger className="mr-3" />
            <span className="text-sm font-medium text-muted-foreground">AgriSync — Consumer Portal</span>
          </header>
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
