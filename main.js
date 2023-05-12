const items = ["😤", "❌", "⛄️", "🦄", "😄", "🙈", "👻", "😻", "💵", "🥳", "🤩", "🍎"];
let numberOfSpins = 3;
const randomCommonValue = items[Math.floor(Math.random() * items.length)];
let prevShuffledItems = [];

function getCommonValuedList(currentList) {
    let tempItems = currentList;
    const commonValueIndex = currentList.findIndex(el => el === randomCommonValue);
    
    tempItems = tempItems.filter(el => el !== randomCommonValue);
    tempItems.unshift(randomCommonValue);
    return tempItems;
}

document.querySelector(".info").textContent = items.join(" ");
const doors = document.querySelectorAll(".door");
spinner.addEventListener("click", spin);

function spin() {
    if (numberOfSpins > 0) {

        numberOfSpins--;
        // Display remaining # of spins
        numOfSpins.innerText = numberOfSpins;

        let animationTime = 0;

        doors.forEach(door => {
            door.innerHTML = "";

            const box = document.createElement('div');
            box.classList.add('box');

            let currentShuffledItems = shuffle(items);

            if (numberOfSpins < 1) 
                currentShuffledItems = getCommonValuedList(currentShuffledItems);
            else 
                while ( prevShuffledItems[0] === currentShuffledItems[0] ) {
                    currentShuffledItems = shuffle(items);
                }

            prevShuffledItems = [...currentShuffledItems];
            
            for (const item of currentShuffledItems) {
                const boxes = document.createElement('div');
                boxes.classList.add('boxes');
                boxes.innerHTML = item;
                box.style.transform = `translateY(-${100 / (items.length) * (items.length - 1)}%)`;
                box.appendChild(boxes);
            }

            // Below code is all about spinning animation

            let animationDuration = Math.random() * 2 + 1;
            // while is used to stop spinning in order
            // Turn it off to see random spinning stops
            while (animationDuration < animationTime) {
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
    // Show congratulating message
    if (numberOfSpins === 0) showCongrats()

}

function showCongrats () {
    setTimeout(() => {
        congrats.style.display = "flex";
    }, 3000);
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
