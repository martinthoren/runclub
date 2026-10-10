// ponytail: Facebook har stängt API:t för gruppers event, så listan underhålls för hand i events.json.
import allEvents from './events.json'

const FB_URL = 'https://www.facebook.com/groups/1597119361540528'

const facts = [
  ['När', 'Varje tisdag kl. 19.00'],
  ['Var', 'Hyttans lekplats'],
  ['Distans', 'Ca 5 km i lugnt tempo, ~7–8 min/km'],
  ['Kostnad', '0 kr – alla är välkomna!'],
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
      <header className="hero">
        <img className="logo" src="logo.png" alt="Kolmården Run Club" />
        <h1>Spring med oss i Kolmården</h1>
        <p>Ingen anmälan, ingen kostnad, inget tempo att leva upp till. Bara kom.</p>
        <a className="btn" href="#event">Se kommande löprundor</a>
      </header>

      <main>
        <section>
          <h2>Varje tisdag</h2>
          <dl className="facts">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
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
