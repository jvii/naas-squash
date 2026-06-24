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
    titleKey: 'event.naascup.title',
    venue: 'Tenniskeskus',
    time: 'TBA',
    date: '23.5.2026',
    image: 'images/naas_cup.jpg',
    link: 'event-naas-cup-2026.html',
  },
];

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
  const limit = container.dataset.limit ? parseInt(container.dataset.limit) : null;
  const showButton = container.dataset.buttons !== 'false';
  const slice = limit ? events.slice(0, limit) : events;
  container.innerHTML = slice.map(e => renderEventCard(e, showButton)).join('');
}
