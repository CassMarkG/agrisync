import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data — would come from Lovable Cloud when enabled
const mockInterests = [
  { id: 1, crop: "Sorghum", quantity: "500 kg", status: "pending", date: "2026-03-18" },
  { id: 2, crop: "Cowpeas", quantity: "2 tonnes", status: "matched", date: "2026-03-15" },
];

const statusStyles: Record<string, string> = {
  pending: "bg-agri-medium/10 text-agri-medium border-agri-medium/20",
  matched: "bg-secondary/10 text-secondary border-secondary/20",
  fulfilled: "bg-muted text-muted-foreground",
};

export default function MyInterests() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Purchase Interests</h1>
        <p className="text-sm text-muted-foreground mt-1">Track the status of your submitted crop interests.</p>
      </div>

      {mockInterests.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center space-y-3">
            <ClipboardList className="h-10 w-10 mx-auto text-muted-foreground/50" />
            <p className="text-muted-foreground">You haven't submitted any purchase interests yet.</p>
            <Button asChild>
              <Link to="/marketplace">
                <ShoppingBasket className="h-4 w-4 mr-2" /> Browse Marketplace
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {mockInterests.map((interest) => (
            <Card key={interest.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium text-foreground">{interest.crop}</p>
                  <p className="text-xs text-muted-foreground">{interest.quantity} · Submitted {interest.date}</p>
                </div>
                <Badge variant="outline" className={statusStyles[interest.status]}>
                  {interest.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        When Lovable Cloud is enabled, your interests will be stored and matched with local producers in real time.
      </p>
    </div>
  );
}
