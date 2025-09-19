import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Save, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AdminSettingsProps {
  onSettingsChange: (settings: any) => void;
}

export const AdminSettings = ({ onSettingsChange }: AdminSettingsProps) => {
  const [settings, setSettings] = useState({
    proModel: "claude-opus-4-1-20250805",
    conModel: "claude-opus-4-1-20250805", 
    analystModel: "claude-opus-4-1-20250805",
    proPrompt: "Your goal is to build the strongest possible case in favour of the user's argument. Prioritise relevance, clarity, and evidence. Anticipate likely objections and pre-empt them. Use plain language and concrete examples. Do not reference the Con or Analyst agents.",
    conPrompt: "Your goal is to present the strongest constructive critique of the user's argument. Identify weaknesses, missing evidence, risks, and better alternatives. Be fair and specific. Offer counter-examples and practical constraints. Do not reference the Pro or Analyst agents.",
    analystPrompt: "Your goal is to evaluate the Pro and Con outputs, weigh evidence, and provide a balanced summary and recommendation. Where claims need verification, perform targeted real-time web checks and cite sources. Highlight areas of agreement, decisive evidence, and residual uncertainty. Provide a short, actionable recommendation at the end."
  });

  const models = [
    { value: "claude-opus-4-1-20250805", label: "Claude Opus 4", badge: "Recommended" },
    { value: "claude-sonnet-4-20250514", label: "Claude Sonnet 4", badge: "Fast" },
    { value: "claude-3-5-haiku-20241022", label: "Claude 3.5 Haiku", badge: "Fastest" },
  ];

  const handleSave = () => {
    onSettingsChange(settings);
  };

  const handleReset = () => {
    // Reset to defaults would be implemented here
    console.log("Reset to defaults");
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Admin Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Model Selection */}
        <div className="space-y-4">
          <h3 className="font-medium text-sm">Model Selection</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pro-model">Pro Agent Model</Label>
              <Select value={settings.proModel} onValueChange={(value) => setSettings({...settings, proModel: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      <div className="flex items-center gap-2">
                        {model.label}
                        {model.badge && <Badge variant="secondary" className="text-xs">{model.badge}</Badge>}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="con-model">Con Agent Model</Label>
              <Select value={settings.conModel} onValueChange={(value) => setSettings({...settings, conModel: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      <div className="flex items-center gap-2">
                        {model.label}
                        {model.badge && <Badge variant="secondary" className="text-xs">{model.badge}</Badge>}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="analyst-model">Analyst Model</Label>
              <Select value={settings.analystModel} onValueChange={(value) => setSettings({...settings, analystModel: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      <div className="flex items-center gap-2">
                        {model.label}
                        {model.badge && <Badge variant="secondary" className="text-xs">{model.badge}</Badge>}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* System Prompts */}
        <div className="space-y-4">
          <h3 className="font-medium text-sm">System Prompts</h3>
          
          <div className="space-y-2">
            <Label htmlFor="pro-prompt">Pro Agent System Prompt</Label>
            <Textarea
              id="pro-prompt"
              value={settings.proPrompt}
              onChange={(e) => setSettings({...settings, proPrompt: e.target.value})}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="con-prompt">Con Agent System Prompt</Label>
            <Textarea
              id="con-prompt"
              value={settings.conPrompt}
              onChange={(e) => setSettings({...settings, conPrompt: e.target.value})}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="analyst-prompt">Analyst Agent System Prompt</Label>
            <Textarea
              id="analyst-prompt"
              value={settings.analystPrompt}
              onChange={(e) => setSettings({...settings, analystPrompt: e.target.value})}
              rows={3}
              className="resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
          <Button variant="outline" onClick={handleReset} className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};