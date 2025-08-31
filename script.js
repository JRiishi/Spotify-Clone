document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = new Audio();
    let isPlaying = false;

    const playBtn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const seekbar = document.querySelector('.seekbar');
    const circle = document.querySelector('.circle');
    const volumeBar = document.getElementById('volumeBar');
    const volumeFill = document.getElementById('volumeFill');

    audioPlayer.volume = 0.5;
    if (volumeFill) {
        volumeFill.style.width = '50%';
    }

    const togglePlay = () => {
        if (!audioPlayer.src) {
            audioPlayer.src = 'Songs/Jahan Teri Yeh Nazar Hai (From Kaalia) - Kishore Kumar.mp3';
        }
        
        if (isPlaying) {
            audioPlayer.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        } else {
            audioPlayer.play().catch(e => console.error('Error playing audio:', e));
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }
        isPlaying = !isPlaying;
    };

    const musicCards = document.querySelectorAll('.music-card');
    musicCards.forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.music-card').forEach(c => {
                c.style.transform = '';
                c.style.backgroundColor = '#181818';
            });

            card.style.transform = 'scale(0.95)';
            card.style.backgroundColor = '#383838';

            const songPath = 'Songs/Jahan Teri Yeh Nazar Hai (From Kaalia) - Kishore Kumar.mp3';
            audioPlayer.src = songPath;
            audioPlayer.play().catch(e => console.error('Error playing audio:', e));
            isPlaying = true;
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        });
    });

    playBtn.addEventListener('click', togglePlay);

    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration) {
            const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            circle.style.left = `${percent}%`;
        }
    });

    if (seekbar) {
        seekbar.addEventListener('click', (e) => {
            const rect = seekbar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            if (audioPlayer.duration) {
                audioPlayer.currentTime = percent * audioPlayer.duration;
            }
        });
    }

    if (volumeBar) {
        volumeBar.addEventListener('click', (e) => {
            const rect = volumeBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            const volume = Math.max(0, Math.min(1, percent));
            audioPlayer.volume = volume;
            if (volumeFill) {
                volumeFill.style.width = `${volume * 100}%`;
            }
        });
    }

    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    });
});
