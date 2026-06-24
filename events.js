const events = [
  {
    typeKey: 'schedule.event.type',
    titleKey: 'event.hontsyt.title',
    venue: 'Tenniskeskus',
    time: '14:00–15:00',
    date: '21.3.2026',
    image: 'images/hontsyt_event.jpg',
    link: 'event-hontsyt.html',
  },
  {
    typeKey: 'schedule.event.type',
    titleKey: 'event.hontsyt.title',
    venue: 'Tenniskeskus',
    time: '14:00–15:00',
    date: '28.3.2026',
    image: 'images/hontsyt1.jpg',
    link: 'event-hontsyt.html',
  },
  {
    typeKey: 'schedule.event.type',
    titleKey: 'event.hontsyt.title',
    venue: 'Tenniskeskus',
    time: '14:00–15:00',
    date: '11.4.2026',
    image: 'images/hontsyt1.jpg',
    link: 'event-hontsyt.html',
  },
  {
    typeKey: 'schedule.event.type',
    titleKey: 'event.hontsyt.title',
    venue: 'Tenniskeskus',
    time: '14:00–15:00',
    date: '25.4.2026',
    image: 'images/event2.jpg',
    link: 'event-hontsyt.html',
  },
  {
    typeKey: 'schedule.event.competition',
    titleKey: 'event.clubchamp.title',
    venue: 'Tenniskeskus',
    time: 'TBA',
    date: '23.5.2026',
    image: 'images/naas_cup.jpg',
    link: 'event-club-championships.html',
  },
  {
    typeKey: 'schedule.event.competition',
    titleKey: 'Nääs-Cup 2026',
    venue: 'Tenniskeskus',
    time: 'TBA',
    date: '12.9.2026',
    image: 'images/naas_cup.jpg',
    link: 'event-naas-cup.html',
  },
];

function parseEventDate(dateStr) {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
}

function renderEventCard(event, showButton) {
  const lang = localStorage.getItem('lang') || 'fi';
  const typeLabel = translations[lang][event.typeKey] || event.typeKey;
  const title = translations[lang][event.titleKey] || event.titleKey;
  const btnLabel = translations[lang]['schedule.event.more'] || 'Lue lisää';
  return `
    <div class="event-card">
      <img src="${event.image}" alt="${title}">
      <div class="event-card-body">
        <p class="event-type">${typeLabel}</p>
        <h3>${title}</h3>
        <div class="event-meta">
          <span>${event.venue}</span>
          <span>${event.time}</span>
          <span>${event.date}</span>
        </div>
        ${showButton ? `<a href="${event.link}" class="btn" style="font-size:0.75rem; padding:0.6rem 1.25rem">${btnLabel}</a>` : ''}
      </div>
    </div>`;
}

function renderEventsGrid(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const limit = container.dataset.limit ? parseInt(container.dataset.limit, 10) : null;
  const showButton = container.dataset.buttons !== 'false';
  const filter = container.dataset.filter;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let filtered = events;
  if (filter === 'upcoming') {
    filtered = events.filter(e => parseEventDate(e.date) >= today);
  } else if (filter === 'past') {
    filtered = events.filter(e => parseEventDate(e.date) < today).reverse();
  }

  const slice = limit ? filtered.slice(0, limit) : filtered;
  container.innerHTML = slice.map(e => renderEventCard(e, showButton)).join('');
}
