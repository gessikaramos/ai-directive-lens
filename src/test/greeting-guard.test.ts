import { describe, it, expect } from "vitest";

// Regression lock — HIT greeting short-circuit (canon Fred 03/jul + briefing Walter).
// ⚠️ MIRRORS supabase/functions/hit_chat/index.ts (v3.2). The Deno edge function
// isn't importable from vitest, so the regex + copy are duplicated here on purpose.
// If you change the guard in index.ts, update this file in the SAME commit.
const GREETING_RE =
  /^(?:[\s,!?.…]|oi+|ol[áa]|opa|e a[íi]|bom dia|boa tarde|boa noite|tudo bem|tudo bom|tudo certo|como vai|como (?:você|voce) est[áa]|hey+|hi+|hello+|hola|yo|good (?:morning|afternoon|evening)|how are you|how'?s it going)+$/i;
const PT_GREETING_RE =
  /(oi+|ol[áa]|opa|e a[íi]|bom dia|boa tarde|boa noite|tudo bem|tudo bom|tudo certo|como vai|como (?:você|voce) est)/i;

const REPLY_PT =
  "Oi — que bom te ver por aqui. Me conta, com tuas próprias palavras, o que você tem em mente. Eu te ajudo a dar forma.";
const REPLY_EN =
  "Hey — good to have you here. Tell me, in your own words, what you have in mind. I'll help give it shape.";

function greetingReply(msg: string): string | null {
  const trimmed = msg.slice(0, 2000);
  if (!GREETING_RE.test(trimmed)) return null;
  return PT_GREETING_RE.test(trimmed) ? REPLY_PT : REPLY_EN;
}

describe("HIT greeting short-circuit (v3.2)", () => {
  it("catches pure greetings, incl. multi-word phrases", () => {
    for (const g of [
      "oi tudo bem?", "olá", "bom dia", "tudo bem?", "hey", "hi", "hello",
      "good morning", "olá, tudo bem", "e aí tudo bem?", "hey how are you", "oiii", "como vai?",
    ]) {
      expect(greetingReply(g), `should greet: "${g}"`).not.toBeNull();
    }
  });

  it("NEVER funnels to 'criar'/'create' on a greeting (the original bug)", () => {
    for (const g of ["oi tudo bem?", "olá", "hey", "good evening", "e aí tudo bem?"]) {
      const reply = greetingReply(g)!;
      expect(reply.toLowerCase()).not.toContain("criar");
      expect(reply.toLowerCase()).not.toContain("create");
    }
  });

  it("does NOT short-circuit when there is real intent (passthrough)", () => {
    for (const m of [
      "oi, quero um vídeo", "olá, preciso de um logo", "hey, I want a brand film",
      "bom dia, tenho uma ideia", "preciso de ajuda", "hilarious", "yo dawg send it",
    ]) {
      expect(greetingReply(m), `should pass through: "${m}"`).toBeNull();
    }
  });

  it("mirrors the user's language", () => {
    expect(greetingReply("oi tudo bem?")).toBe(REPLY_PT);
    expect(greetingReply("hey")).toBe(REPLY_EN);
  });
});
