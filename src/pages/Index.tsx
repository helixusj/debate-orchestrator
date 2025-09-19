import { useState } from "react";
import { RecordingButton } from "@/components/RecordingButton";
import { TranscriptDisplay } from "@/components/TranscriptDisplay";
import { DebateOrchestrator } from "@/components/DebateOrchestrator";
import { AdminSettings } from "@/components/AdminSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Settings, Mic } from "lucide-react";
import heroImage from "@/assets/hero-debate.jpg";

const Index = () => {
  const [transcript, setTranscript] = useState("");
  const [settings, setSettings] = useState({});

  const handleTranscript = (newTranscript: string) => {
    setTranscript(newTranscript);
  };

  const handleSettingsChange = (newSettings: any) => {
    setSettings(newSettings);
  };

  const handleReset = () => {
    setTranscript("");
  };

  return (
    <div className="min-h-screen bg-gradient-accent">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="relative mb-6">
            <img 
              src={heroImage} 
              alt="AI agents debating around a conference table in a modern setting"
              className="w-full max-w-4xl mx-auto rounded-xl shadow-lg"
            />
          </div>
          <div className="bg-gradient-hero bg-clip-text text-transparent">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">AI Debate Platform</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Record your speech and watch three AI agents debate the topic with structured analysis
          </p>
        </header>

        <Tabs defaultValue="debate" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="debate" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Debate Analysis
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Admin Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="debate" className="space-y-8">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-card rounded-lg p-8 shadow-md border">
                <div className="text-center mb-6">
                  <Mic className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">Record Your Argument</h2>
                  <p className="text-muted-foreground">
                    Speak your thoughts and let our AI agents analyze different perspectives
                  </p>
                </div>
                <RecordingButton onTranscript={handleTranscript} />
              </div>

              {transcript && <TranscriptDisplay transcript={transcript} />}
            </div>

            <DebateOrchestrator 
              transcript={transcript} 
              settings={settings}
              onReset={handleReset}
            />
          </TabsContent>

          <TabsContent value="settings">
            <AdminSettings onSettingsChange={handleSettingsChange} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
