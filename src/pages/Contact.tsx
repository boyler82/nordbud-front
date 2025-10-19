export default function Contact() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">Kontakt</h1>
      <p className="mt-4 text-gray-600">
        Napisz do nas: <a href="mailto:biuro@nordbud.pl" className="text-brand-600">biuro@nordbud.pl</a>
      </p>
      <form className="mt-8 grid gap-4">
        <input className="rounded-xl border p-3" placeholder="Imię i nazwisko" />
        <input className="rounded-xl border p-3" placeholder="E-mail" type="email" />
        <textarea className="min-h-[120px] rounded-xl border p-3" placeholder="Twoja wiadomość" />
        <button className="rounded-xl bg-brand-500 px-5 py-3 font-medium text-white hover:bg-brand-600">
          Wyślij
        </button>
      </form>
    </main>
  )
}