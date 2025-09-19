import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, BarChart3, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface DebateAgentProps {
  type: "pro" | "con" | "analyst";
  title: string;
  content: string;
  isActive?: boolean;
  isComplete?: boolean;
}

const agentConfig = {
  pro: {
    icon: ThumbsUp,
    color: "bg-success text-success-foreground",
    bgClass: "border-success/20 bg-success/5",
  },
  con: {
    icon: ThumbsDown,
    color: "bg-warning text-warning-foreground",
    bgClass: "border-warning/20 bg-warning/5",
  },
  analyst: {
    icon: BarChart3,
    color: "bg-primary text-primary-foreground",
    bgClass: "border-primary/20 bg-primary/5",
  },
};

export const DebateAgent = ({ type, title, content, isActive, isComplete }: DebateAgentProps) => {
  const config = agentConfig[type];
  const Icon = config.icon;

  // Parse content to extract structured elements
  const lines = content.split('\n').filter(line => line.trim());
  const bulletPoints = lines.filter(line => line.trim().startsWith('•') || line.trim().startsWith('-'));
  const paragraphs = lines.filter(line => !line.trim().startsWith('•') && !line.trim().startsWith('-') && line.length > 20);

  return (
    <Card className={cn(
      "transition-all duration-300 shadow-md",
      config.bgClass,
      isActive && "ring-2 ring-primary/50 shadow-glow",
      !isComplete && !isActive && "opacity-60"
    )}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={cn("h-8 w-8 rounded-full p-0 flex items-center justify-center", config.color)}>
              <Icon className="h-4 w-4" />
            </Badge>
            <span className="text-lg font-semibold">{title}</span>
          </div>
          {isActive && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
              Analyzing...
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          {content ? (
            <div className="space-y-4">
              {paragraphs.length > 0 && (
                <div className="space-y-3">
                  {paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-sm leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
              
              {bulletPoints.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Key Points:</h4>
                  <ul className="space-y-1">
                    {bulletPoints.map((point, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{point.replace(/^[•-]\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mock source links for analyst */}
              {type === "analyst" && isComplete && (
                <div className="mt-4 pt-4 border-t border-border">
                  <h4 className="font-medium text-sm mb-2">Sources:</h4>
                  <div className="space-y-1">
                    <a href="#" className="text-xs text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      Recent market analysis - Financial Times
                    </a>
                    <a href="#" className="text-xs text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      Industry report - McKinsey & Company
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <p className="text-sm">Waiting for analysis...</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};