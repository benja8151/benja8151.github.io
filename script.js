// Replace this array with your list of image URLs
const imageUrls = [
    "https://picsum.photos/201/301",
    "https://picsum.photos/202/302",
    "https://picsum.photos/203/303",
    "https://picsum.photos/204/304",
    "https://picsum.photos/205/305",
    "https://picsum.photos/206/306",
    // Add more URLs here
];

let shuffled = [];
let currentIndex = 0;

function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function showNextImage() {
    if (currentIndex >= shuffled.length) {
        shuffled = shuffleArray(imageUrls);
        currentIndex = 0;
    }
    const currentUrl = shuffled[currentIndex];
    document.getElementById('image').src = currentUrl;
    const patternIndex = imageUrls.indexOf(currentUrl) + 1;
    document.getElementById('title').textContent = `Pattern #${patternIndex}`;
    currentIndex++;
}

function populateGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; // Clear if needed
    imageUrls.forEach((url, index) => {
        const item = document.createElement('div');
        item.classList.add('grid-item');
        
        const label = document.createElement('p');
        label.textContent = `Pattern #${index + 1}`;
        
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Pattern #${index + 1}`;
        
        item.appendChild(label);
        item.appendChild(img);
        grid.appendChild(item);
    });
}

function toggleView() {
    const singleView = document.getElementById('single-view');
    const allView = document.getElementById('all-view');
    const toggleBtn = document.getElementById('toggle');
    
    if (allView.style.display === 'none') {
        singleView.style.display = 'none';
        allView.style.display = 'block';
        toggleBtn.textContent = 'Show Single';
        populateGrid(); // Always populate on show to ensure it's loaded
    } else {
        singleView.style.display = 'block';
        allView.style.display = 'none';
        toggleBtn.textContent = 'Show All';
    }
}

// Initialize
shuffled = shuffleArray(imageUrls);
showNextImage();

document.getElementById('next').addEventListener('click', showNextImage);
document.getElementById('toggle').addEventListener('click', toggleView);

const modeToggle = document.getElementById('mode-toggle');
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    modeToggle.textContent = document.body.classList.contains('dark') ? 'Switch to Light Mode' : 'Switch to Dark Mode';
});