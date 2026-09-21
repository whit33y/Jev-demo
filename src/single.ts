import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

if(!process.env.TYPESAFE_API_KEY) {
  console.error("Dodaj swój klucz API TypeSafe do pliku .env przed uruchomieniem demo.");
  process.exit(1);
}

const client = new TypeSafeClient();

const startedAt = performance.now();
const response = await client.systemOne({
  state: { document: "Mam problem z zamówieniem, nie mogę go wysłać na stronie intrnetowej przycisk nie działa" },
  questions: {
    team: choice("Do jakiego team'u powinniśmy skierować to pytanie?", {
      customer_support: 'Team wspomagający klientów w rozwiązywaniu problemów z zamówieniami',
      technical: 'Team techniczny pomagający w rozwiązywaniu problemów technicznych',
      sales: 'Team sprzedażowy pomagający w zamówieniach i ofertach',
    }),
  },
});
const elapsedMs = performance.now() - startedAt;

console.dir(response, { depth: null });
console.log(`Czas: ${elapsedMs.toFixed(0)} ms`);
