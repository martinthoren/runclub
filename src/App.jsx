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

// Fotot + effekter i fotots egna koordinater (1889×833), så de följer med vid zoom/beskärning.
const sparkles = [
  [1296, 338, 0], [1305, 352, 1.1], [1290, 366, 0.4], [1310, 380, 1.7],
  [1298, 395, 0.8], [1286, 408, 2.2], [1312, 418, 1.4], [1300, 428, 0.2],
]

function HeroBg() {
  return (
    <svg className="hero-bg" viewBox="0 0 1889 833" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="glow">
          <stop offset="0" stopColor="#fff6d8" stopOpacity=".9" />
          <stop offset=".35" stopColor="#ffc970" stopOpacity=".45" />
          <stop offset="1" stopColor="#ff9a4d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="haze">
          <stop offset="0" stopColor="#ffe2c4" stopOpacity="1" />
          <stop offset="1" stopColor="#ffe2c4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <image href="hero.jpg" width="1889" height="833" />
      <g className="clouds" fill="url(#haze)">
        <ellipse cx="300" cy="90" rx="300" ry="40" />
        <ellipse cx="900" cy="60" rx="360" ry="36" />
      </g>
      <circle className="sun-glow" cx="1300" cy="255" r="150" fill="url(#glow)" />
      <g fill="#fff3d0">
        {sparkles.map(([x, y, delay]) => (
          <ellipse key={y} className="sparkle" cx={x} cy={y} rx="9" ry="2" style={{ animationDelay: `${delay}s` }} />
        ))}
      </g>
    </svg>
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
        <HeroBg />
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
