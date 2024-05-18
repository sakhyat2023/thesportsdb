const playersList = document.querySelector(".players-list");
const cartPlayer = document.querySelector(".cart-player");
const totalPlayer = document.querySelector(".total-players");
const modal = document.getElementById("modal-dialog");
const input = document.getElementById("search-player");

const fetchInputData = async () => {
  const res = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${input.value}`
  );
  const data = await res.json();
  playersList.innerHTML = "";
  data.player.forEach((player) => {
    playersList.innerHTML += `
        <div class="col-md-6 col-lg-4">
        <div class="card">
          <img src="${player.strThumb}" class="card-img-top" alt="">
          <div class="card-body d-flex flex-column gap-2">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0">${player.strPlayer}</h5>
              <div class="social-links fs-4 d-flex gap-2">
                <a href="https://${
                  player.strTwitter
                }" class="nav-link"><i class="fa-brands fa-square-twitter"></i></a>
                <a href="https://${
                  player.strInstagram
                }" class="nav-link"> <i class="fa-brands fa-instagram"></i></a>
              </div>
            </div>
            <div class="d-flex flex-column gap-2">
              <span>Nationality: ${player.strNationality}</span>
              <span>Team: ${player.strTeam}</span>
              <span>Sport: ${player.strSport}</span>
              <span>Wage: ${player.strWage}</span> 
            </div>
            <p class="card-text">${player.strDescriptionEN.slice(0, 100)}</p>
            <button onclick="handleAddCart('${
              player.strPlayer
            }', this)" class="btn btn-secondary add-to-cart-btn">
              Add to cart
            </button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="showDetails(${
              data.player.idPlayer
            })">Details</button>
          </div>
        </div>
        </div>
    `;
  });
};

const fetchTeamData = async () => {
  const res = await fetch(
    "https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=Arsenal"
  );
  const data = await res.json();
  data.player.forEach((player) => {
    playersList.innerHTML += `
        <div class="col-md-6 col-lg-4">
        <div class="card">
          <img src="${player.strThumb}" class="card-img-top" alt="">
          <div class="card-body d-flex flex-column gap-2">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0">${player.strPlayer}</h5>
              <div class="social-links fs-4 d-flex gap-2">
                <a href="https://${
                  player.strTwitter
                }" class="nav-link"><i class="fa-brands fa-square-twitter"></i></a>
                <a href="https://${
                  player.strInstagram
                }" class="nav-link"> <i class="fa-brands fa-instagram"></i></a>
              </div>
            </div>
            <div class="d-flex flex-column gap-2">
              <span>Nationality: ${player.strNationality}</span>
              <span>Team: ${player.strTeam}</span>
              <span>Sport: ${player.strSport}</span>
              <span>Wage: ${player.strWage}</span> 
            </div>
            <p class="card-text">${player.strDescriptionEN.slice(0, 90)}</p>
            <button onclick="handleAddCart('${
              player.strPlayer
            }', this)" class="btn btn-secondary add-to-cart-btn">
              Add to cart
            </button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="showDetails(${
              player.idPlayer
            })">Details</button>
          </div>
        </div>
        </div>
    `;
  });
};

const fetchData = async () => {
  input.addEventListener("input", async () => {
    if (!input.value) {
      await fetchTeamData();
    } else {
      await fetchInputData();
    }
  });
  await fetchTeamData();
};

fetchData();

let cartItems = [];

const handleAddCart = (playerName, button) => {
  if (!cartItems.includes(playerName)) {
    if (cartItems.length <= 10) {
      cartItems.push(playerName);
      const div = document.createElement("div");
      div.classList = "card p-2";
      div.innerHTML = playerName;
      cartPlayer.appendChild(div);
      totalPlayer.innerHTML = cartItems.length;
      button.textContent = "Added";
      button.classList = "btn btn-danger";
    } else {
      button.disabled = true;
      button.classList = "btn btn-secondary";
      alert("You can not added more than 11 players");
    }
  }
};

const showDetails = async (playerId) => {
  const res = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`
  );
  const data = await res.json();

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">${data.players[0].strPlayer}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <p>Agent: ${data.players[0].strAgent}</p>
      <p>Nationality: ${data.players[0].strNationality}</p>
      <p>BirthLocation: ${data.players[0].strBirthLocation}</p>
      <p>Height: ${data.players[0].strHeight}</p>
      <p>Position: ${data.players[0].strPosition}</p>
      </div>
    </div>
    `;
};
