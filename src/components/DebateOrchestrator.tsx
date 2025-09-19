import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DebateAgent } from "./DebateAgent";
import { Play, RefreshCw } from "lucide-react";

interface DebateOrchestratorProps {
  transcript: string;
  settings: any;
  onReset: () => void;
}

export const DebateOrchestrator = ({ transcript, settings, onReset }: DebateOrchestratorProps) => {
  const [currentAgent, setCurrentAgent] = useState<"pro" | "con" | "analyst" | null>(null);
  const [agentOutputs, setAgentOutputs] = useState({
    pro: "",
    con: "",
    analyst: ""
  });
  const [isComplete, setIsComplete] = useState(false);

  const runDebate = async () => {
    setIsComplete(false);
    setAgentOutputs({ pro: "", con: "", analyst: "" });
    
    // Pro Agent
    setCurrentAgent("pro");
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    setAgentOutputs(prev => ({
      ...prev,
      pro: generateMockOutput("pro", transcript)
    }));

    // Con Agent
    setCurrentAgent("con");
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    setAgentOutputs(prev => ({
      ...prev,
      con: generateMockOutput("con", transcript)
    }));

    // Analyst Agent
    setCurrentAgent("analyst");
    await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate API call with web search
    setAgentOutputs(prev => ({
      ...prev,
      analyst: generateMockOutput("analyst", transcript)
    }));

    setCurrentAgent(null);
    setIsComplete(true);
  };

  const generateMockOutput = (agentType: string, transcript: string) => {
    const baseOutput = {
      pro: `Pro Agent: Case for the Argument

The argument presented demonstrates strong foundational merit and addresses a significant need in the current landscape. The core proposition aligns with established best practices and emerging trends that support long-term viability.

Key supporting evidence includes documented precedents, market validation, and alignment with regulatory frameworks. The proposal addresses genuine pain points while offering scalable solutions.

Key Points:
• Strong market demand validates the core premise
• Established precedents demonstrate feasibility
• Risk mitigation strategies are clearly outlined
• Implementation timeline is realistic and achievable
• Resource requirements are within acceptable parameters
• Stakeholder alignment supports successful execution

The evidence strongly supports moving forward with this initiative, as the potential benefits significantly outweigh the identified risks.`,

      con: `Con Agent: Critical Assessment

While the argument contains merit, several critical concerns require careful consideration before proceeding. The proposal faces significant implementation challenges and market uncertainties that could undermine success.

Key areas of concern include resource constraints, competitive pressures, and regulatory uncertainties. The timeline may be overly optimistic given the complexity of execution required.

Key Points:
• Market conditions remain volatile and unpredictable
• Resource requirements may exceed current capabilities
• Competitive landscape presents significant challenges
• Regulatory environment introduces compliance risks
• Implementation complexity could lead to cost overruns
• Alternative approaches may offer better risk-adjusted returns

A more cautious approach with additional validation steps would better serve long-term objectives and stakeholder interests.`,

      analyst: `Analyst Agent: Balanced Assessment & Recommendation

After evaluating both perspectives, the evidence presents a nuanced picture requiring careful consideration of trade-offs. Both arguments raise valid points that merit attention in decision-making.

The Pro argument correctly identifies genuine opportunities and market validation. However, the Con perspective raises legitimate concerns about execution risks and resource allocation that cannot be dismissed.

Key Points:
• Market opportunity is real but competitive landscape is challenging
• Implementation risks are manageable with proper planning
• Resource requirements justify potential returns
• Phased approach could mitigate execution risks
• Stakeholder alignment needs strengthening
• Contingency planning is essential for success

Recommendation: Proceed with a modified approach that incorporates risk mitigation strategies while capitalizing on identified opportunities. Implement a phased rollout with clear success metrics and exit criteria.`
    };

    return baseOutput[agentType as keyof typeof baseOutput] || "Analysis pending...";
  };

  if (!transcript) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Provide a transcript to begin the debate analysis</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Three-Agent Debate Analysis</h2>
        <div className="flex gap-2">
          <Button onClick={runDebate} disabled={currentAgent !== null} className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Start Debate
          </Button>
          <Button variant="outline" onClick={onReset} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DebateAgent
          type="pro"
          title="Pro Agent"
          content={agentOutputs.pro}
          isActive={currentAgent === "pro"}
          isComplete={!!agentOutputs.pro}
        />
        
        <DebateAgent
          type="con"
          title="Con Agent"
          content={agentOutputs.con}
          isActive={currentAgent === "con"}
          isComplete={!!agentOutputs.con}
        />
        
        <DebateAgent
          type="analyst"
          title="Analyst Agent"
          content={agentOutputs.analyst}
          isActive={currentAgent === "analyst"}
          isComplete={!!agentOutputs.analyst}
        />
      </div>
    </div>
  );
};