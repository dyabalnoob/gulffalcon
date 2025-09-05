import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Brand } from "@shared/schema";

interface ProductFiltersProps {
  brands: Brand[];
  onFilter: (filters: {
    search: string;
    brandId: string;
    tags: string[];
  }) => void;
}

const availableTags = ["ثوب", "مشلح", "بشت", "فاخر", "تقليدي"];

export default function ProductFilters({ brands, onFilter }: ProductFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const handleFilter = () => {
    onFilter({
      search,
      brandId: selectedBrand,
      tags: activeTags,
    });
  };

  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearTags = () => {
    setActiveTags([]);
  };

  return (
    <div className="glass-card p-6 rounded-3xl mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          type="text"
          placeholder="بحث بالاسم..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-2xl bg-input border-border focus:ring-2 focus:ring-ring"
          data-testid="input-search-products"
        />
        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger className="md:w-48 rounded-2xl bg-input border-border" data-testid="select-brand-filter">
            <SelectValue placeholder="كل الماركات" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">كل الماركات</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.id}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          onClick={handleFilter}
          className="px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-bold hover:scale-105 transition-all"
          data-testid="button-apply-filter"
        >
          تطبيق الفلتر
        </Button>
      </div>
      
      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {availableTags.map((tag) => (
          <Button
            key={tag}
            variant={activeTags.includes(tag) ? "default" : "ghost"}
            size="sm"
            onClick={() => toggleTag(tag)}
            className={`px-4 py-2 rounded-xl text-sm transition-all ${
              activeTags.includes(tag)
                ? "bg-primary text-primary-foreground"
                : "glass-card hover:bg-primary hover:text-primary-foreground"
            }`}
            data-testid={`button-tag-${tag}`}
          >
            {tag}
          </Button>
        ))}
        {activeTags.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearTags}
            className="px-4 py-2 rounded-xl text-sm bg-white/10 dark:bg-white/10 light:bg-black/5"
            data-testid="button-clear-tags"
          >
            مسح
          </Button>
        )}
      </div>
    </div>
  );
}
