import {
  Users,
  LogIn,
  Send,
  Sparkles,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";

const stats = [
  {
    title: "User Signups",
    value: "12,482",
    change: "+12.5%",
    description: "vs. last month",
    icon: Users,
    trend: "up",
  },
  {
    title: "User Sign-ins",
    value: "9,847",
    change: "+8.2%",
    description: "vs. last month",
    icon: LogIn,
    trend: "up",
  },
  {
    title: "Submissions",
    value: "48,291",
    change: "+18.7%",
    description: "vs. last month",
    icon: Send,
    trend: "up",
  },
  {
    title: "AI Credits Used",
    value: "76,420",
    change: "-4.3%",
    description: "vs. last month",
    icon: Sparkles,
    trend: "down",
    progress: 76,
  },
];

export default function UsageStats() {
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Platform Overview
        </h2>
        <p className="text-sm text-muted-foreground">
          Monitor user activity and AI resource consumption.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.title}
              className="rounded-2xl border bg-card shadow-sm"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold tracking-tight">
                      {stat.value}
                    </div>

                    <div className="mt-1 flex items-center gap-1 text-xs">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5 text-green-600" />
                      )}

                      <span className="font-medium text-green-600">
                        {stat.change}
                      </span>

                      <span className="text-muted-foreground">
                        {stat.description}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Credit Progress */}
                {stat.progress && (
                  <div className="mt-5 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        Monthly usage
                      </span>
                      <span className="font-medium">
                        {stat.progress}%
                      </span>
                    </div>

                    <Progress value={stat.progress} className="h-1.5" />

                    <p className="text-xs text-muted-foreground">
                      23,580 credits remaining
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}