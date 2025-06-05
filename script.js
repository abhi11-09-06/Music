
 // DOM Elements
        const audioPlayer = document.getElementById('audio-player');
        const playPauseIcon = document.getElementById('play-pause-icon');
        const progressBar = document.getElementById('progress');
        const currentTimeEl = document.getElementById('current-time');
        const durationEl = document.getElementById('duration');
        const currentSongEl = document.getElementById('current-song');
        const currentArtistEl = document.getElementById('current-artist');
        const albumList = document.getElementById('album-list');
        const playerCover = document.getElementById('player-cover');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');

        // Bollywood Songs Collection
        const songs = [
            {
                title: "Demons",
                artist: "Imagine Dragons",
                album: "Night Visions",
                src: "Songs/240279-712db320-7eaf-4778-ac13-5fd141cf4797.mp3",
                cover: "https://c.saavncdn.com/210/Night-Visions-2013-500x500.jpg"
            },
            {
                title: "7 years",
                artist: "Lukas Graham",
                album: "",
                src: "Songs/Lukas-Graham-7-valobi.comYears.mp3",
                cover: "https://a10.gaanacdn.com/gn_img/albums/NOXWVgbkqL/OXWVdloMKk/size_m.webp"
            },
            {
                title: "No Cap",
                artist: "KRSNA",
                album: "KRSNA MUSIC",
                src: "Songs/No_Cap_Krsna.mp3",
                cover: "https://c.saavncdn.com/402/No-Cap-Hindi-2021-20211109214254-500x500.jpg"
            },
            {
                title: "I GUESS",
                artist: "KRSNA",
                album: "KRSNA MUSIC",
                src: "Songs/I Guess Krsna 128 Kbps.mp3",
                cover: "https://a10.gaanacdn.com/gn_img/albums/Rz4W87v3xD/4W8e0M76bx/size_m.jpg"
            },
            {
                title: "Softly",
                artist: "Karan Aujla",
                album: "",
                src: "Songs/Softly_Karan_Aujla.mp3",
                cover: "https://c.saavncdn.com/538/Making-Memories-English-2023-20230818075015-500x500.jpg"
            },
            {
                title: "Jaadugar",
                artist: "Paradox",
                album: "",
                src: "Songs/Jaadugar - Paradox (pagalall.com).mp3",
                cover: "https://pagalall.com/wp-content/uploads/Jaadugar-Paradox-pagalall.com_.jpg.webp"
            },
            {
                title: "Chhore Ncr Aale",
                artist: "MC Square, Paradox",
                album: "",
                src: "Songs/Chhore Ncr Aale Hustle 2.0 128 Kbps.mp3",
                cover: "https://pagalall.com/wp-content/uploads/Jaadugar-Paradox-pagalall.com_.jpg.webp"
            },
            {
                title: "Supreme",
                artist: "Shubh",
                album: "",
                src: "Songs/Supreme_1.mp3",
                cover: "https://i.scdn.co/image/ab67616d0000b273caee3f6563eb76d2fa902561"
            },
            {
                title: "Angreji Beat",
                artist: "Honey Singh",
                album: "",
                src: "Songs/Angreji_Beat.mp3",
                cover: "https://c.saavncdn.com/blob/924/International-Villager-Punjabi-2011-20220722144441-500x500.jpg"
            },
            {
                title: "Afsos",
                artist: "Anuv Jain, AP Dhillon",
                album: "",
                src: "Songs/Afsos_Anuv_Jain_AP_Dhillon.mp3",
                cover: "https://c.saavncdn.com/773/Afsos-Punjabi-2025-20250129053900-500x500.jpg"
            },
            {
                title: "Wavy",
                artist: "Karan Aujla",
                album: "",
                src: "Songs/Wavy_1.mp3",
                cover: "https://c.saavncdn.com/178/Wavy-Punjabi-2024-20250523044332-500x500.jpg"
            },
            {
                title: "Yaar Mod Do",
                artist: "Guru Randhawa, Millind Gaba",
                album: "",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
                cover: "https://c.saavncdn.com/679/Yaar-Mod-Do-Punjabi-2016-500x500.jpg"
            }
        ];

        let currentSongIndex = 0;
        let isPlaying = false;
        let isShuffled = false;
        let isRepeating = false;
        let originalSongsOrder = [...songs];
        let currentPlaylist = [...songs];

        // Initialize app
        function init() {
            loadAlbums();
            createParticles();

            // Auto-play prevention handling
            audioPlayer.addEventListener('canplaythrough', () => {
                if (audioPlayer.duration) {
                    durationEl.textContent = formatTime(audioPlayer.duration);
                }
            });
        }

        // Create animated background particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.width = Math.random() * 4 + 2 + 'px';
                particle.style.height = particle.style.width;
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Load albums into the grid
        function loadAlbums() {
            albumList.innerHTML = '';
            currentPlaylist.forEach((song, index) => {
                const albumCard = document.createElement('div');
                albumCard.className = 'album-card';
                albumCard.innerHTML = `
                    <div class="album-cover">
                        <img src="${song.cover}" alt="${song.title}" onerror="this.src='https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'">
                        <div class="play-overlay">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="album-info">
                        <h5>${song.title}</h5>
                        <p>${song.artist}</p>
                        <small class="text-muted">${song.album}</small>
                    </div>
                `;
                albumCard.addEventListener('click', () => playSong(index));
                albumList.appendChild(albumCard);
            });
        }

        // Play a specific song
        function playSong(index) {
            if (index < 0 || index >= currentPlaylist.length) return;

            currentSongIndex = index;
            const song = currentPlaylist[currentSongIndex];

            audioPlayer.src = song.src;
            currentSongEl.textContent = song.title;
            currentArtistEl.textContent = song.artist;
            playerCover.src = song.cover;

            // Add loading state
            playPauseIcon.className = 'fas fa-spinner fa-spin';

            audioPlayer.load();
            audioPlayer.play().then(() => {
                isPlaying = true;
                playPauseIcon.className = 'fas fa-pause';
                updateActiveCard();
            }).catch(e => {
                console.log('Playback failed:', e);
                playPauseIcon.className = 'fas fa-play';
                // Try next song if current fails
                setTimeout(() => nextSong(), 1000);
            });
        }

        // Update active card visual state
        function updateActiveCard() {
            document.querySelectorAll('.album-card').forEach(card => {
                card.classList.remove('playing');
            });

            const activeCard = document.querySelectorAll('.album-card')[currentSongIndex];
            if (activeCard) {
                activeCard.classList.add('playing');
            }
        }

        // Toggle play/pause
        function togglePlay() {
            if (!audioPlayer.src) {
                playSong(0);
                return;
            }

            if (isPlaying) {
                audioPlayer.pause();
                isPlaying = false;
                playPauseIcon.className = 'fas fa-play';
            } else {
                audioPlayer.play().then(() => {
                    isPlaying = true;
                    playPauseIcon.className = 'fas fa-pause';
                }).catch(e => {
                    console.log('Playback failed:', e);
                });
            }
        }

        // Next song
        function nextSong() {
            if (isRepeating && currentPlaylist.length > 1) {
                // Don't change index, just replay current song
                playSong(currentSongIndex);
                return;
            }

            currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
            playSong(currentSongIndex);
        }

        // Previous song
        function previousSong() {
            // If more than 3 seconds played, restart current song
            if (audioPlayer.currentTime > 3) {
                audioPlayer.currentTime = 0;
                return;
            }

            currentSongIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
            playSong(currentSongIndex);
        }

        // Shuffle functionality
        function toggleShuffle() {
            isShuffled = !isShuffled;
            const shuffleBtn = document.getElementById('shuffle-btn');

            if (isShuffled) {
                shuffleBtn.style.color = '#1db954';
                // Create shuffled playlist
                const currentSong = currentPlaylist[currentSongIndex];
                currentPlaylist = [...songs].sort(() => Math.random() - 0.5);
                currentSongIndex = currentPlaylist.findIndex(song => song === currentSong);
            } else {
                shuffleBtn.style.color = '#ffffff';
                // Restore original order
                const currentSong = currentPlaylist[currentSongIndex];
                currentPlaylist = [...originalSongsOrder];
                currentSongIndex = currentPlaylist.findIndex(song => song === currentSong);
            }

            loadAlbums();
            updateActiveCard();
        }

        // Repeat functionality
        function toggleRepeat() {
            isRepeating = !isRepeating;
            const repeatBtn = document.getElementById('repeat-btn');

            if (isRepeating) {
                repeatBtn.style.color = '#1db954';
                audioPlayer.loop = true;
            } else {
                repeatBtn.style.color = '#ffffff';
                audioPlayer.loop = false;
            }
        }

        // Set volume
        function setVolume(value) {
            audioPlayer.volume = value;
            updateVolumeIcon(value);
        }

        // Toggle mute
        function toggleMute() {
            const volumeSlider = document.getElementById('volume-slider');
            if (audioPlayer.volume > 0) {
                audioPlayer.dataset.previousVolume = audioPlayer.volume;
                audioPlayer.volume = 0;
                volumeSlider.value = 0;
            } else {
                const previousVolume = audioPlayer.dataset.previousVolume || 1;
                audioPlayer.volume = previousVolume;
                volumeSlider.value = previousVolume;
            }
            updateVolumeIcon(audioPlayer.volume);
        }

        // Update volume icon based on level
        function updateVolumeIcon(volume) {
            const volumeIcon = document.getElementById('volume-icon');
            if (volume === 0) {
                volumeIcon.className = 'fas fa-volume-mute volume-icon';
            } else if (volume < 0.5) {
                volumeIcon.className = 'fas fa-volume-down volume-icon';
            } else {
                volumeIcon.className = 'fas fa-volume-up volume-icon';
            }
        }

        // Seek to specific time
        function seekTo(event) {
            if (!audioPlayer.duration) return;

            const progressBarEl = event.currentTarget;
            const rect = progressBarEl.getBoundingClientRect();
            const percent = (event.clientX - rect.left) / rect.width;
            audioPlayer.currentTime = percent * audioPlayer.duration;
        }

        // Search functionality
        function searchSongs() {
            const searchInput = document.getElementById('search-input');
            const query = searchInput.value.toLowerCase();

            if (query === '') {
                currentPlaylist = [...originalSongsOrder];
            } else {
                currentPlaylist = originalSongsOrder.filter(song =>
                    song.title.toLowerCase().includes(query) ||
                    song.artist.toLowerCase().includes(query) ||
                    song.album.toLowerCase().includes(query)
                );
            }

            currentSongIndex = 0;
            loadAlbums();
        }

        // Keyboard shortcuts
        function handleKeyboard(event) {
            switch(event.code) {
                case 'Space':
                    event.preventDefault();
                    togglePlay();
                    break;
                case 'ArrowRight':
                    if (event.ctrlKey) {
                        event.preventDefault();
                        nextSong();
                    }
                    break;
                case 'ArrowLeft':
                    if (event.ctrlKey) {
                        event.preventDefault();
                        previousSong();
                    }
                    break;
                case 'ArrowUp':
                    if (event.ctrlKey) {
                        event.preventDefault();
                        const currentVolume = Math.min(1, audioPlayer.volume + 0.1);
                        setVolume(currentVolume);
                        document.getElementById('volume-slider').value = currentVolume;
                    }
                    break;
                case 'ArrowDown':
                    if (event.ctrlKey) {
                        event.preventDefault();
                        const currentVolume = Math.max(0, audioPlayer.volume - 0.1);
                        setVolume(currentVolume);
                        document.getElementById('volume-slider').value = currentVolume;
                    }
                    break;
            }
        }

        // Toggle sidebar for mobile
        function toggleSidebar() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('full-width');
        }

        // Format time display
        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }

        // Update progress bar and time
        audioPlayer.addEventListener('timeupdate', () => {
            const currentTime = audioPlayer.currentTime;
            const duration = audioPlayer.duration;

            if (duration) {
                const progressPercent = (currentTime / duration) * 100;
                progressBar.style.width = `${progressPercent}%`;
                currentTimeEl.textContent = formatTime(currentTime);
                durationEl.textContent = formatTime(duration);
            }
        });

        // Handle song end
        audioPlayer.addEventListener('ended', () => {
            nextSong();
        });

        // Handle mobile responsiveness
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('collapsed');
                mainContent.classList.remove('full-width');
            }
        });

        // Initialize the app
        init();
