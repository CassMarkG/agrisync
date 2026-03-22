import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, MapPin, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { crops, monthLabels } from "@/lib/cropData";
import { useToast } from "@/hooks/use-toast";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

export default function MarketplaceCropDetail() {
  const { cropName } = useParams();
  const { toast } = useToast();
  const crop = crops.find((c) => c.name === decodeURIComponent(cropName || ""));

  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!crop) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Crop not found.</p>
        <Link to="/marketplace" className="text-primary underline text-sm mt-2 inline-block">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const priceData = crop.priceHistory.map((p, i) => ({ month: monthLabels[i], price: p }));
  const supplyDemandData = crop.demandHistory.map((d, i) => ({
    month: monthLabels[i],
    demand: d,
    supply: crop.supplyHistory[i],
  }));
  const coveragePercent = Math.round((crop.projectedSupply / crop.projectedDemand) * 100);

  const handleSubmit = () => {
    if (!quantity || !contactName || !contactPhone) {
      toast({ title: "Missing fields", description: "Please fill in quantity, name, and phone.", variant: "destructive" });
      return;
    }
    // Mock submission — would go to Lovable Cloud when enabled
    setSubmitted(true);
    toast({ title: "Interest Submitted!", description: `Your interest in ${crop.name} has been recorded. A coordinator will contact you.` });
  };

  const trendIcon = crop.trend === "up"
    ? <TrendingUp className="h-4 w-4 text-secondary" />
    : crop.trend === "down"
    ? <TrendingDown className="h-4 w-4 text-destructive" />
    : <Minus className="h-4 w-4 text-muted-foreground" />;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <Link to="/marketplace" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Marketplace
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{crop.name}</h1>
          <p className="text-sm text-muted-foreground">{crop.category} · Season: {crop.growingSeason}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Current Price</p>
            <div className="flex items-center gap-1.5 text-xl font-bold text-foreground">
              P{crop.pricePerKg.toFixed(2)}/kg {trendIcon}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Projected Demand", value: `${(crop.projectedDemand / 1000).toFixed(1)}k tonnes` },
          { label: "Projected Supply", value: `${(crop.projectedSupply / 1000).toFixed(1)}k tonnes` },
          { label: "Supply Coverage", value: `${coveragePercent}%` },
          { label: "Yield / Hectare", value: `${crop.yieldPerHectare} t` },
        ].map((m) => (
          <Card key={m.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-lg font-bold text-foreground mt-1">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Price Trend (6 months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Supply vs Demand */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Supply vs Demand</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={supplyDemandData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip />
                <Area type="monotone" dataKey="demand" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" />
                <Area type="monotone" dataKey="supply" fill="hsl(var(--secondary) / 0.15)" stroke="hsl(var(--secondary))" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Regional Availability */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Regional Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {crop.regions.map((r) => (
              <div key={r.name} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.hectares.toLocaleString()} ha · {r.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Purchase Interest Form */}
      <Card className="border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Send className="h-4 w-4 text-primary" />
            Express Purchase Interest
          </CardTitle>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center py-6 space-y-2">
              <Badge className="bg-secondary/10 text-secondary border-secondary/20 text-sm px-3 py-1">
                ✓ Interest Recorded
              </Badge>
              <p className="text-sm text-muted-foreground">
                Your interest in <strong>{crop.name}</strong> has been submitted. An AgriSync coordinator will reach out to connect you with local producers.
              </p>
              <Button variant="outline" size="sm" onClick={() => setSubmitted(false)} className="mt-2">
                Submit Another
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Your Name *</label>
                <Input placeholder="Full name" value={contactName} onChange={(e) => setContactName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Phone Number *</label>
                <Input placeholder="+267…" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Quantity *</label>
                <div className="flex gap-2">
                  <Input placeholder="Amount" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="flex-1" />
                  <select value={unit} onChange={(e) => setUnit(e.target.value)} className="rounded-md border border-input bg-background px-3 text-sm">
                    <option value="kg">kg</option>
                    <option value="tonnes">tonnes</option>
                    <option value="bags">bags (50kg)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Notes (optional)</label>
                <Textarea placeholder="Delivery preference, timing…" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
              </div>
              <div className="sm:col-span-2">
                <Button onClick={handleSubmit} className="w-full sm:w-auto">
                  <Send className="h-4 w-4 mr-2" /> Submit Interest
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
