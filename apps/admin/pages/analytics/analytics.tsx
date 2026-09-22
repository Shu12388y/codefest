import { useEffect } from "react";
import { BriefcaseBusiness, FileText, RefreshCw, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchAnalytics } from "../../reducers/analyticsReducer";

const numberFormat = new Intl.NumberFormat();
const formatNumber = (value: number | undefined) => value === undefined ? "-" : numberFormat.format(value);

export default function UsageStats() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.analytics);

  useEffect(() => { void dispatch(fetchAnalytics()); }, [dispatch]);

  const totalCredits = data?.openRouter.credits.total_credits ?? 0;
  const totalUsage = data?.openRouter.credits.total_usage ?? 0;
  const remainingCredits = Math.max(totalCredits - totalUsage, 0);
  const usagePercent = totalCredits > 0 ? Math.min((totalUsage / totalCredits) * 100, 100) : 0;
  const key = data?.openRouter.key;

  const cards = [
    { title: "Total blogs", value: formatNumber(data?.blogs.total), icon: FileText, description: "Published blog records" },
    { title: "Total job posts", value: formatNumber(data?.jobs.total), icon: BriefcaseBusiness, description: "Available opportunities" },
    { title: "AI credits used", value: formatNumber(totalUsage), icon: Sparkles, description: "OpenRouter account usage" },
    { title: "AI credits remaining", value: formatNumber(remainingCredits), icon: Sparkles, description: "Available from total credits" },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div><h2 className="text-2xl font-semibold tracking-tight">Platform overview</h2><p className="text-sm text-muted-foreground">Live content and AI resource information from the API.</p></div>
        <Button variant="outline" size="sm" onClick={() => void dispatch(fetchAnalytics())} disabled={loading}><RefreshCw className={loading ? "animate-spin" : ""} /> Refresh</Button>
      </div>
      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ title, value, icon: Icon, description }) => <Card key={title} className="border shadow-sm"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle><div className="flex size-9 items-center justify-center rounded-lg bg-muted"><Icon className="size-4" /></div></CardHeader><CardContent><div className="text-2xl font-bold tracking-tight">{loading && !data ? "..." : value}</div><p className="mt-1 text-xs text-muted-foreground">{description}</p></CardContent></Card>)}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border shadow-sm"><CardHeader><CardTitle>OpenRouter credit usage</CardTitle><CardDescription>Current usage reported by the OpenRouter account.</CardDescription></CardHeader><CardContent className="space-y-4"><div className="flex justify-between text-sm"><span>Usage</span><span className="font-medium">{formatNumber(totalUsage)} / {formatNumber(totalCredits)}</span></div><Progress value={usagePercent} className="h-2" /><div className="flex justify-between text-xs text-muted-foreground"><span>{usagePercent.toFixed(1)}% used</span><span>{formatNumber(remainingCredits)} remaining</span></div></CardContent></Card>
        <Card className="border shadow-sm"><CardHeader><CardTitle>OpenRouter key information</CardTitle><CardDescription>Configuration details returned by the provider.</CardDescription></CardHeader><CardContent className="grid gap-3 text-sm sm:grid-cols-2"><div><p className="text-muted-foreground">Label</p><p className="font-medium">{key?.label || "-"}</p></div><div><p className="text-muted-foreground">Usage limit</p><p className="font-medium">{key?.limit == null ? "Unlimited" : formatNumber(key.limit)}</p></div><div><p className="text-muted-foreground">Free tier</p><p className="font-medium">{key?.is_free_tier ? "Yes" : "No"}</p></div><div><p className="text-muted-foreground">Rate limit</p><p className="font-medium">{key?.rate_limit ? String(key.rate_limit) : "-"}</p></div></CardContent></Card>
      </div>
    </div>
  );
}
