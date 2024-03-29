import Feed from './feed'; // No need for .js extension

function fetchPodcastFeed() {
  const feedUrl = "https://feeds.castos.com/owg73";
  const feed = new Feed({ url: feedUrl });
  feed.load((err, items) => {
    if (err) {
      console.error("Error fetching RSS feed:", err);
    } else {
      populateEpisodeList(items);
       // Plyr initialization moved inside the callback
       Plyr.setup().then(() => {
        const playerContainers = document.querySelectorAll("data-plyr-provider");
        playerContainers.forEach(container => {
          const player = new Plyr(container);
          // Additional configuration for each player if needed
        });
      });
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
