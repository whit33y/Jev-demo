import { choice, noul, score, TypeSafeClient } from "@typesafe-ai/sdk";

if (!process.env.TYPESAFE_API_KEY) {
  console.error("Dodaj swój klucz API TypeSafe do pliku .env przed uruchomieniem demo.");
  process.exit(1);
}

const client = new TypeSafeClient();

const state = {
  message: "Kontaktowałem się z wami już trzy razy i wciąż czekam.",
};

const startedAt = performance.now();
const response = await client.systemOne({
  state,
  questions: {
    isFrustrated: noul("Czy `message` wyraża frustrację?"),
    requestType: choice("Jaka jest główna prośba w `message`?", {
      update: "Prosi o aktualizację lub postęp w istniejącej sprawie.",
      refund: "Prosi o zwrot pieniędzy.",
      replacement: "Prosi o wymianę produktu.",
      other: "Główna prośba nie pasuje do pozostałych opcji.",
    }),
    frustrationLevel: score("Jak dużą frustrację wyraża `message`?", [
      "Zgłasza prośbę bez wyrażania frustracji.",
      "Wyraża niezadowolenie bez silnej złości.",
      "Wyraża silną złość.",
    ]),
  },
});
const elapsedMs = performance.now() - startedAt;

console.dir(response, { depth: null });
console.log(`Czas: ${elapsedMs.toFixed(0)} ms`);

const reviewThreshold = 0.8;
if (response.answers.isFrustrated.noul >= reviewThreshold) {
  console.log("Oznacz tę wiadomość do przeglądu przez support.");
} else {
  console.log("Zostaw tę wiadomość w zwykłej kolejce supportu.");
}