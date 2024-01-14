import Feed from './feed.js';

function fetchPodcastFeed() {
  const feedUrl = "https://feeds.castos.com/8ro36?uuid=631ba96a65a2f";
  const feed = new Feed({ url: feedUrl });
  feed.load((err, items) => {
    if (err) {
      console.error("Error fetching RSS feed:", err);
    } else {
      populateEpisodeList(items);
    }
  });
}

function populateEpisodeList(episodes) {
  const episodeList = document.getElementById("episode-list");
  for (const episode of episodes) {
    const episodeItem = document.createElement("li");

    const titleElement = document.createElement("h3");
    titleElement.textContent = episode.title;
    episodeItem.appendChild(titleElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = episode.description;
    episodeItem.appendChild(descriptionElement);

    const playerContainer = document.createElement("div");
    playerContainer.setAttribute("data-plyr-provider", "podcast");
    playerContainer.setAttribute("data-plyr-embed-id", "episode-" + episode.id);
    episodeItem.appendChild(playerContainer);

    episodeList.appendChild(episodeItem);
  }
}

fetchPodcastFeed();

Plyr.setup().then(() => {
  const playerContainers = document.querySelectorAll("[data-plyr-provider]");
  playerContainers.forEach(container => {
    const player = new Plyr(container);
    // Additional configuration for each player if needed
  });
});
