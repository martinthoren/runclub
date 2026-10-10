// ponytail: Facebook har stängt API:t för gruppers event, så listan underhålls för hand i events.json.
import allEvents from './events.json'

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Hyttans+lekplats+Kolm%C3%A5rden'
const FB_URL = 'https://www.facebook.com/groups/1597119361540528'

// Ikoner som på flygbladet (linjeikoner, 24×24).
const icons = {
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
  shoe: <path d="M2 18h20v-2.2a2 2 0 0 0-1.5-1.9l-5.6-1.5-3.4-5-2.6 1.4L7 7.5 2.5 11ZM2 15.5h20M10 11l1.5-.8M11.5 13l1.5-.8" />,
  people: <><circle cx="9" cy="7" r="4" /><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2M16 3.1a4 4 0 0 1 0 7.8M22 21v-2a4 4 0 0 0-3-3.9" /></>,
}

const facts = [
  ['calendar', 'Dag', 'Varje tisdag'],
  ['clock', 'Tid', 'Kl. 19.00'],
  ['pin', 'Samling', <a key="maps" href={MAPS_URL} target="_blank" rel="noreferrer">Hyttans lekplats</a>],
  ['shoe', 'Vi springer', 'Ca 5 km i lugnt tempo', 'förslagsvis 7.00–8.00 min/km'],
  ['people', 'Kostnad', '0 kr – alla är välkomna!'],
]

const fmt = new Intl.DateTimeFormat('sv-SE', {
  weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
})

const today = new Date().toISOString().slice(0, 10)

function Events() {
  const events = allEvents.filter((e) => e.start >= today).sort((a, b) => a.start.localeCompare(b.start))

  return (
    <>
      {events.length ? (
        <ul className="events">
          {events.map((e) => (
            <li key={e.start + e.name}>
              <EventCard {...e} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">Inga särskilda event just nu – vi springer som vanligt varje tisdag.</p>
      )}
      <p>
        <a className="btn" href={`${FB_URL}/events`} target="_blank" rel="noreferrer">
          Alla event i Facebook-gruppen
        </a>
      </p>
    </>
  )
}

function EventCard(e) {
  const body = (
    <div>
      <time dateTime={e.start}>{fmt.format(new Date(e.start))}</time>
      <h3>{e.name}</h3>
      {e.place && <p className="muted">{e.place}</p>}
    </div>
  )
  return e.url ? (
    <a className="card" href={e.url} target="_blank" rel="noreferrer">{body}</a>
  ) : (
    <div className="card">{body}</div>
  )
}

export default function App() {
  return (
    <>
      <nav className="topbar">
        <a href="#"><img src="logo.png" alt="Kolmården Run Club" /></a>
        <div>
          <a href="#event">Event</a>
          <a href={FB_URL} target="_blank" rel="noreferrer">Facebook</a>
        </div>
      </nav>

      <header className="hero">
        <h1>Spring med oss i Kolmården</h1>
        <p>Ingen anmälan, ingen kostnad, inget tempo att leva upp till. Bara kom.</p>
        <a className="btn" href="#event">Se kommande löprundor</a>
      </header>

      <main>
        <section>
          <h2>Varje tisdag</h2>
          <dl className="facts">
            {facts.map(([icon, k, v, note]) => (
              <div key={k}>
                <svg viewBox="0 0 24 24" aria-hidden="true">{icons[icon]}</svg>
                <dt>{k}</dt>
                <dd>
                  {v}
                  {note && <small>{note}</small>}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="event">
          <h2>Kommande event</h2>
          <Events />
        </section>

        <section className="flyer">
          <img src="flyer.png" alt="Flygblad: Löparträff vid solnedgången" loading="lazy" />
        </section>
      </main>

      <footer>
        <a href={FB_URL}>Facebook</a> · Kolmården Run Club
      </footer>
    </>
  )
}
