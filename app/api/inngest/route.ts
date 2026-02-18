import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { prospectingAgent } from "@/app/api/inngest/functions/prospecting";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    prospectingAgent,
  ],
});
