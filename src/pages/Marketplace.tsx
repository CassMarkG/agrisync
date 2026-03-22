import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { crops, type CropData } from "@/lib/cropData";

const categories = ["All", "Grain", "Legume", "Fruit", "Oilseed", "Vegetable"];

const trendIcon = (trend: CropData["trend"]) => {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-secondary" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const supplyLabel = (crop: CropData) => {
  const ratio = (crop.projectedSupply / crop.projectedDemand) * 100;
  if (ratio < 60) return { text: "Low Supply", className: "bg-destructive/10 text-destructive border-destructive/20" };
  if (ratio < 90) return { text: "Moderate", className: "bg-agri-medium/10 text-agri-medium border-agri-medium/20" };
  return { text: "Well Supplied", className: "bg-secondary/10 text-secondary border-secondary/20" };
};

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = crops.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || c.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Crop Marketplace</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Browse available crops, compare prices, and express your purchase interest.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search crops…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={category === cat ? "default" : "outline"}
              onClick={() => setCategory(cat)}
              className="text-xs"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Crop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((crop) => {
          const supply = supplyLabel(crop);
          return (
            <Link key={crop.name} to={`/marketplace/${encodeURIComponent(crop.name)}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{crop.name}</h3>
                      <p className="text-xs text-muted-foreground">{crop.category} · {crop.growingSeason}</p>
                    </div>
                    <Badge variant="outline" className={supply.className}>
                      {supply.text}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Price / kg</p>
                      <div className="flex items-center gap-1.5 font-semibold text-foreground">
                        P{crop.pricePerKg.toFixed(2)}
                        {trendIcon(crop.trend)}
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Supply Coverage</p>
                      <p className="font-semibold text-foreground">
                        {Math.round((crop.projectedSupply / crop.projectedDemand) * 100)}%
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {crop.regions.slice(0, 2).map((r) => (
                      <span key={r.name} className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {r.name}
                      </span>
                    ))}
                    {crop.regions.length > 2 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        +{crop.regions.length - 2} more
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No crops match your search.</p>
        </div>
      )}
    </div>
  );
}
