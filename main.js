
const items = [
    "🍭",
    "❌",
    "⛄️",
    "🦄",
    "🍌",
    "💩",
    "👻",
    "😻",
    "💵",
    "🤡",
    "🦖",
    "🍎"
];
document.querySelector(".info").textContent = items.join(" ");

const doors = document.querySelectorAll(".door");
document.querySelector("#spinner").addEventListener("click", spin);


function spin() {
    let animationTime = 0;

    doors.forEach(door => {
        door.innerHTML = "";

        const box = document.createElement('div');
        box.classList.add('box');

        for (const item of items) {
            shuffledItems = shuffle(items);
            const boxes = document.createElement('div');
            boxes.classList.add('boxes');
            boxes.innerHTML = item;
            box.style.transform = `translateY(-${100 / (items.length) * (items.length - 1)}%)`;
            box.appendChild(boxes);
        }

        let animationDuration = Math.random() * 2 + 1;
        // while is used to stop spinning in order
        // Turn it off to see random spinning stops
        while (animationDuration < animationTime ) {
            animationDuration = Math.random() * 3;
        }

        // Storing animation time of the previous element to stop
        animationTime = animationDuration;

        box.style.setProperty('--rotationDegree', `-${100 / (items.length) * (items.length - 1)}%`);
        box.style.animation = `rotate ${animationDuration}s ease-in-out`;
        box.style.transform = `translateY(0)`;
        
        door.appendChild(box);
    });

}

function rotate(box) {
    console.log(box)
    box.forEach(boxes => {
        boxes.style.setProperty('--rotationDegree', items.length - 1);
        boxes.classList.add('rotated');
        console.log(boxes)
        boxes.style.transform = 'translateY(0)'
    });
}

function shuffle(items) {
    let currentIndex = items.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [items[currentIndex], items[randomIndex]] = [
            items[randomIndex], items[currentIndex]];
    }

    return items;
}
