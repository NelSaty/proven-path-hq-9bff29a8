import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const {
      name,
      domain,
      tier,
      skills,
      tfes,
      projects,
      badges,
      earned,
      location,
      roleContext,
    } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const prompt = `You are advising an employer evaluating this candidate for hire.

Candidate: ${name || "Unknown"}
Location: ${location || "—"}
Domain: ${domain || "—"}
Tier: ${tier || "—"}
TFES Score: ${tfes ?? "—"} / 100
Verified Projects: ${projects ?? 0}
Badges Earned: ${badges ?? 0}
Earnings to date: ${earned || "—"}
Skills: ${skills?.length ? skills.join(", ") : "—"}
${roleContext ? `Role being hired for: ${roleContext}` : ""}

Produce a concise HIRING-READY SUMMARY for a recruiter / hiring manager with:

1. **Hiring Verdict** — one of: Strong Hire / Hire / Lean Hire / Hold / Pass — with a one-line reason.
2. **Fit Score** — out of 100, with a one-sentence justification (consider TFES, projects, skills depth).
3. **Top Strengths** — 3 bullets, evidence-based (cite the data above).
4. **Risks & Gaps** — 2-3 bullets a recruiter must probe.
5. **Best-fit Roles** — 3 specific job titles this candidate is ready for today.
6. **Suggested Interview Questions** — 3 sharp, role-specific questions.
7. **Compensation Band (India)** — realistic monthly/annual range for this profile.

Be decisive, recruiter-tone, no fluff. Use markdown.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content:
                "You are a senior technical recruiter for the Indian tech market. You write decisive, evidence-based hiring summaries for engineering managers. Use markdown.",
            },
            { role: "user", content: prompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited — please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI analysis failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content ?? "No summary generated.";

    return new Response(JSON.stringify({ summary }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-candidate error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
