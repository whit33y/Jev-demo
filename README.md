# Jev

Projekt TypeScript (Node, ESM). Dwa dema korzystające z `@typesafe-ai/sdk`.

## Uruchomienie

Skopiuj `.env.example` do `.env` i uzupełnij `TYPESAFE_API_KEY`, a następnie:

```bash
npm run single   # src/single.ts — jedno pytanie typu choice
npm run all      # src/example-questions.ts — noul + choice + score
```

Oba skrypty mierzą czas wywołania `client.systemOne()` przez `performance.now()`
i wypisują całą odpowiedź (`console.dir(response, { depth: null })`) oraz
`Czas: <ms> ms`.

## Przykładowa odpowiedź — `src/single.ts`

Routing zgłoszenia do odpowiedniego zespołu:

```
{
  model: 'jev-1.13.0',
  answers: {
    team: {
      type: 'choice',
      choice: 'technical',
      confidence: 0.75,
      probabilities: { customer_support: 0.16, technical: 0.84, sales: 0 }
    }
  },
  usage: { input_tokens: 422, output_tokens: 39 }
}
```

## Przykładowa odpowiedź — `src/example-questions.ts`

Trzy pytania naraz w jednym wywołaniu:

```
{
  model: 'jev-1.13.0',
  answers: {
    isFrustrated: { type: 'noul', noul: 0.95 },
    requestType: {
      type: 'choice',
      choice: 'update',
      confidence: 0.99,
      probabilities: { refund: 0, other: 0.01, replacement: 0, update: 0.99 }
    },
    frustrationLevel: {
      type: 'score',
      score: 1.05,
      confidence: 0.93,
      legend: {
        '0': 'Zgłasza prośbę bez wyrażania frustracji.',
        '1': 'Wyraża niezadowolenie bez silnej złości.',
        '2': 'Wyraża silną złość.'
      },
      probabilities: { '0': 0, '1': 0.95, '2': 0.05 }
    }
  },
  usage: { input_tokens: 529, output_tokens: 84 }
}
Oznacz tę wiadomość do przeglądu przez support.
```

## Pola odpowiedzi

| Pole | Znaczenie |
| --- | --- |
| `model` | wersja modelu, która odpowiedziała |
| `answers.<nazwa>.type` | typ pytania: `noul`, `choice` lub `score` |
| `noul` | prawdopodobieństwo „tak” dla pytania `noul()` (0–1) |
| `choice` | wybrana opcja z pytania `choice()` |
| `score` | wartość na skali z pytania `score()` (0 … liczba pozycji legendy − 1) |
| `confidence` | pewność modelu co do wybranej odpowiedzi (0–1) |
| `probabilities` | rozkład prawdopodobieństwa po wszystkich opcjach |
| `legend` | opisy kolejnych punktów skali (`score`) |
| `usage` | zużyte tokeny wejścia i wyjścia |
| `Czas` | czas trwania wywołania `systemOne()` w ms (mierzony lokalnie, nie zwracany przez API) |

