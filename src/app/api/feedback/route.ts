/** QA ONLY: unconditional block, no request parsing or downstream integrations. */
export async function POST(request: Request) {
  void request; // Deliberately never parse or transmit the body.
  return Response.json({ success: false, error: "QA preview: delivery disabled" }, { status: 503 });
}
