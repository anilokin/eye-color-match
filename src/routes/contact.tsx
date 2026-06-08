import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Контакти | Eye Color Match" },
      { name: "description", content: "Свържи се с екипа на Eye Color Match за въпроси, обратна връзка или партньорства." },
      { property: "og:title", content: "Контакти | Eye Color Match" },
      { property: "og:description", content: "Изпрати ни съобщение – тук сме за теб." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <LegalLayout title="Контакти">
      <p>
        Радваме се да чуем от теб! Ако имаш въпрос, предложение, доклад за грешка или
        искаш да си партнираме – пиши ни.
      </p>

      <h2>Имейл</h2>
      <p>
        <a href="mailto:contact@eye-color-match.lovable.app">
          contact@eye-color-match.lovable.app
        </a>
      </p>

      <h2>Време за отговор</h2>
      <p>Стараем се да отговаряме в рамките на 3 работни дни.</p>

      <h2>Сътрудничество и реклама</h2>
      <p>
        За партньорства и възможности за реклама извън Google AdSense, моля включи в
        имейла кратко описание на предложението си.
      </p>

      <h2>Юридически въпроси</h2>
      <p>
        За въпроси, свързани с поверителност или условия за ползване, виж{" "}
        <a href="/privacy">Политика за поверителност</a> и{" "}
        <a href="/terms">Общи условия</a>.
      </p>
    </LegalLayout>
  );
}
