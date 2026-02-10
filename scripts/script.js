  const customPokemonList = [
            {"name":"manectric","url":"https://pokeapi.co/api/v2/pokemon/310/"},{"name":"plusle","url":"https://pokeapi.co/api/v2/pokemon/311/"},{"name":"minun","url":"https://pokeapi.co/api/v2/pokemon/312/"},{"name":"volbeat","url":"https://pokeapi.co/api/v2/pokemon/313/"},{"name":"illumise","url":"https://pokeapi.co/api/v2/pokemon/314/"},{"name":"roselia","url":"https://pokeapi.co/api/v2/pokemon/315/"},{"name":"gulpin","url":"https://pokeapi.co/api/v2/pokemon/316/"},{"name":"swalot","url":"https://pokeapi.co/api/v2/pokemon/317/"},{"name":"carvanha","url":"https://pokeapi.co/api/v2/pokemon/318/"},{"name":"sharpedo","url":"https://pokeapi.co/api/v2/pokemon/319/"},{"name":"wailmer","url":"https://pokeapi.co/api/v2/pokemon/320/"},{"name":"wailord","url":"https://pokeapi.co/api/v2/pokemon/321/"},{"name":"numel","url":"https://pokeapi.co/api/v2/pokemon/322/"},{"name":"camerupt","url":"https://pokeapi.co/api/v2/pokemon/323/"},{"name":"torkoal","url":"https://pokeapi.co/api/v2/pokemon/324/"},{"name":"spoink","url":"https://pokeapi.co/api/v2/pokemon/325/"},{"name":"grumpig","url":"https://pokeapi.co/api/v2/pokemon/326/"},{"name":"spinda","url":"https://pokeapi.co/api/v2/pokemon/327/"},{"name":"trapinch","url":"https://pokeapi.co/api/v2/pokemon/328/"},{"name":"vibrava","url":"https://pokeapi.co/api/v2/pokemon/329/"},{"name":"flygon","url":"https://pokeapi.co/api/v2/pokemon/330/"},{"name":"cacnea","url":"https://pokeapi.co/api/v2/pokemon/331/"},{"name":"cacturne","url":"https://pokeapi.co/api/v2/pokemon/332/"},{"name":"swablu","url":"https://pokeapi.co/api/v2/pokemon/333/"},{"name":"altaria","url":"https://pokeapi.co/api/v2/pokemon/334/"},{"name":"zangoose","url":"https://pokeapi.co/api/v2/pokemon/335/"},{"name":"seviper","url":"https://pokeapi.co/api/v2/pokemon/336/"},{"name":"lunatone","url":"https://pokeapi.co/api/v2/pokemon/337/"},{"name":"solrock","url":"https://pokeapi.co/api/v2/pokemon/338/"},{"name":"barboach","url":"https://pokeapi.co/api/v2/pokemon/339/"},{"name":"whiscash","url":"https://pokeapi.co/api/v2/pokemon/340/"},{"name":"corphish","url":"https://pokeapi.co/api/v2/pokemon/341/"},{"name":"crawdaunt","url":"https://pokeapi.co/api/v2/pokemon/342/"},{"name":"baltoy","url":"https://pokeapi.co/api/v2/pokemon/343/"},{"name":"claydol","url":"https://pokeapi.co/api/v2/pokemon/344/"},{"name":"lileep","url":"https://pokeapi.co/api/v2/pokemon/345/"},{"name":"cradily","url":"https://pokeapi.co/api/v2/pokemon/346/"},{"name":"anorith","url":"https://pokeapi.co/api/v2/pokemon/347/"},{"name":"armaldo","url":"https://pokeapi.co/api/v2/pokemon/348/"},{"name":"feebas","url":"https://pokeapi.co/api/v2/pokemon/349/"},{"name":"milotic","url":"https://pokeapi.co/api/v2/pokemon/350/"},{"name":"castform","url":"https://pokeapi.co/api/v2/pokemon/351/"},{"name":"kecleon","url":"https://pokeapi.co/api/v2/pokemon/352/"},{"name":"shuppet","url":"https://pokeapi.co/api/v2/pokemon/353/"},{"name":"banette","url":"https://pokeapi.co/api/v2/pokemon/354/"},{"name":"duskull","url":"https://pokeapi.co/api/v2/pokemon/355/"}
        ];

        let currentOffset = 0;
        const limit = 20;
        const pokemonCache = {};
        const detailsCache = {}; 
        let loadedPokemonIds = []; 
        let currentOverlayId = null;

        const container = document.getElementById('pokedex-container');
        const loadBtn = document.getElementById('loadMoreBtn');
        const spinner = document.getElementById('loading-spinner');
        const overlay = document.getElementById('overlay');
        const overlayContent = document.getElementById('overlay-content');

   
        async function loadNextBatch() {
            setLoading(true);
            try {
                const batch = customPokemonList.slice(currentOffset, currentOffset + limit);
                if(batch.length === 0) return handleEndOfList();

                const batchHTML = await fetchBatchData(batch);
                container.innerHTML += batchHTML;
                currentOffset += limit;

                if(currentOffset >= customPokemonList.length) handleEndOfList();
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        async function fetchBatchData(batch) {
            let html = "";
            for (const p of batch) {
                const data = await getPokemonData(p.url);
                if(data) {
                    loadedPokemonIds.push(data.id);
                    html += createCardHTML(data);
                }
            }
            return html;
        }

        function setLoading(isActive) {
            loadBtn.disabled = isActive;
            loadBtn.innerText = isActive ? "Lade..." : "Load More Pokémon";
            spinner.style.display = isActive ? 'block' : 'none';
        }

        function handleEndOfList() {
            loadBtn.style.display = 'none';
        }

        async function getPokemonData(url) {
            if (pokemonCache[url]) return pokemonCache[url];
            try {
                const res = await fetch(url);
                const data = await res.json();
                pokemonCache[url] = data;
                detailsCache[data.id] = data;
                return data;
            } catch (e) { return null; }
        }

        function createCardHTML(pokemon) {
            const mainType = pokemon.types[0].type.name;
            const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            const image = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

            return `
                <div class="card type-${mainType}" onclick="openOverlay(${pokemon.id})">
                    <span class="card-id">#${pokemon.id}</span>
                    <img src="${image}" alt="${name}" loading="lazy">
                    <h3>${name}</h3>
                    <div class="type-badge">${mainType}</div>
                </div>
            `;
        }

      
        async function searchPokemon() {
            const term = document.getElementById('searchInput').value.toLowerCase().trim();
            if (term.length === 0) return resetPokedex();
            if (term.length < 3) return alert("Bitte mindestens 3 Buchstaben eingeben!");

            startSearchUI();
            const matches = customPokemonList.filter(p => p.name.includes(term));
            
            if (matches.length === 0) showNoResults();
            else await renderMatches(matches);
            
            endSearchUI();
        }

        function startSearchUI() {
            container.innerHTML = "";
            loadBtn.style.display = "none";
            loadedPokemonIds = []; 
            spinner.style.display = 'block';
        }

        async function renderMatches(matches) {
            let html = "";
            for (const p of matches) {
                const data = await getPokemonData(p.url);
                if(data) {
                    loadedPokemonIds.push(data.id);
                    html += createCardHTML(data);
                }
            }
            container.innerHTML = html;
        }

        function endSearchUI() {
            spinner.style.display = 'none';
        }

        function showNoResults() {
            container.innerHTML = "<p style='grid-column:1/-1; text-align:center;'>Keine Pokémon gefunden.</p>";
        }

        function resetPokedex() {
            container.innerHTML = "";
            currentOffset = 0;
            loadedPokemonIds = [];
            loadBtn.style.display = "block";
            loadNextBatch();
        }

     
        function openOverlay(id) {
            currentOverlayId = id;
            const data = detailsCache[id];
            if (!data) return;

            const statsHTML = getStatsHTML(data.stats);
            overlayContent.innerHTML = getOverlayTemplate(data, statsHTML);
            
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function getStatsHTML(stats) {
            return stats.map(s => {
                const name = shortenStatName(s.stat.name);
                const val = s.base_stat;
                const color = getStatColor(val);
                return getStatRowHTML(name, val, color);
            }).join('');
        }

        function shortenStatName(name) {
            return name.replace('special-', 'Sp.').replace('attack', 'Atk').replace('defense', 'Def').toUpperCase();
        }

        function getStatColor(val) {
            return val >= 90 ? '#4caf50' : (val >= 60 ? '#ffb300' : '#ff5350');
        }

        function getStatRowHTML(name, val, color) {
            const percent = Math.min(val, 100);
            return `
                <div class="stat-row">
                    <div class="stat-name">${name}</div>
                    <div class="stat-value">${val}</div>
                    <div class="stat-bar-bg"><div class="stat-bar-fill" style="width:${percent}%; background:${color}"></div></div>
                </div>`;
        }

        function getOverlayTemplate(data, statsHTML) {
            const mainType = data.types[0].type.name;
            const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            const image = data.sprites.other['official-artwork'].front_default;

            return `
                <div class="overlay-header type-${mainType}">
                    <button class="close-btn" onclick="closeOverlay()">×</button>
                    <button class="nav-arrow nav-prev" onclick="navigateOverlay(-1)">&#10094;</button>
                    <button class="nav-arrow nav-next" onclick="navigateOverlay(1)">&#10095;</button>
                    
                    <span style="position:absolute; top:20px; left:20px; font-weight:bold; opacity:0.5; font-size:1.5rem">#${data.id}</span>
                    <img src="${image}" alt="${name}">
                    <h2 style="margin:0; text-shadow:0 2px 4px rgba(0,0,0,0.2)">${name}</h2>
                    <div class="type-badge" style="background:rgba(255,255,255,0.3); margin-top:10px">${mainType}</div>
                </div>
                <div class="overlay-body">
                    <h3 style="text-align:center; margin-bottom:20px; color:#555">Base Stats</h3>
                    ${statsHTML}
                </div>`;
        }

        function navigateOverlay(direction) {
            const currentIndex = loadedPokemonIds.indexOf(currentOverlayId);
            if (currentIndex === -1) return;

            const nextIndex = currentIndex + direction;
            if (nextIndex >= 0 && nextIndex < loadedPokemonIds.length) {
                openOverlay(loadedPokemonIds[nextIndex]);
            }
        }

        function closeOverlay() {
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

       
        loadNextBatch();