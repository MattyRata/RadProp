export async function POST(req) {
  const body = await req.json();
  const { form } = body;

  const prompt = `You are an expert radiology staffing consultant. Generate a professional contract proposal for a traveling/per diem radiology technologist with these details:

Facility: ${form.facilityName} (${form.facilityType})
Location: ${form.location}
Modality: ${form.modality}
Shift Type: ${form.shiftType}
Years of Experience: ${form.experience}
Desired Hourly Rate: $${form.hourlyRate}/hr
Contract Length: ${form.contractLength}
Housing/Stipend: ${form.housing}
Additional Notes: ${form.extras}

Write a polished, professional proposal letter that:
1. Opens with a strong professional introduction
2. Highlights the technologist's value
3. Clearly states the proposed contract terms
4. Mentions compliance readiness (ARRT, state licensure, BLS)
5. Closes with a confident call to action

Keep it 300-400 words. Professional tone.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  const text = data.content?.map((b) => b.text || "").join("") || "Error generating proposal.";

  return Response.json({ proposal: text });
}
