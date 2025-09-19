import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

interface TranscriptDisplayProps {
  transcript: string;
}

export const TranscriptDisplay = ({ transcript }: TranscriptDisplayProps) => {
  if (!transcript) return null;

  return (
    <Card className="animate-fade-in shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-primary" />
          Transcript
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-32">
          <p className="text-sm leading-relaxed">{transcript}</p>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};