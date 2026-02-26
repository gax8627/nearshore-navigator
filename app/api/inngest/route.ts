import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { prospectingAgent } from "@/app/api/inngest/functions/prospecting";
import { leadEnrichment } from "@/app/api/inngest/functions/leadEnrichment";
import { generateSocialContent } from "@/app/api/inngest/functions/generateSocialContent";
import { deliverLeadMagnet } from "@/app/api/inngest/functions/deliverLeadMagnet";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    prospectingAgent,
    leadEnrichment,
    generateSocialContent,
    deliverLeadMagnet,
  ],
});
