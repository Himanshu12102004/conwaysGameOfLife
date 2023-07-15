const canvas = document.getElementById("canvas");
let animationId = null;
let timeoutId = null;
const n = parseInt(innerWidth / 20);
const m = parseInt(innerHeight / 20);
const image = document.getElementById("img");
let isRunning = false;
canvas.style.display = "grid";
canvas.style.gridTemplateRows = `repeat(${m},20px)`;
canvas.style.gridTemplateColumns = `repeat(${n},20px)`;
const deploy = () => {
  for (const key in lastGen) {
    document.getElementById(key).classList.add("live");
    document.getElementById(key).classList.remove("dead");
  }
};
for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    const elem = document.createElement("div");
    elem.setAttribute("id", `${i}-${j}`);
    elem.setAttribute("onclick", `livingCell(${i},${j})`);
    elem.classList.add("dead");
    canvas.appendChild(elem);
  }
}
let lastGen = {};
let newGen = {};
const livingCell = (i, j) => {
  id = `${i}-${j}`;
  const clickedCell = document.getElementById(id);
  clickedCell.classList.toggle("live");
  clickedCell.classList.toggle("dead");
  if (clickedCell.classList.contains("live")) {
    lastGen[id] = [i, j];
  }
  if (clickedCell.classList.contains("dead")) {
    delete lastGen[id];
  }
};
const start = document.getElementById("start");
start.addEventListener("click", () => {
  const animation = () => {
    lastGen = animate(lastGen);
    deploy(lastGen);
    timeoutId = setTimeout(() => {
      requestAnimationFrame(animation);
    }, 200); // Delay in milliseconds
  };
  if (!isRunning) {
    isRunning = true;
    image.setAttribute("src", "./stop.svg");
    document.getElementById("startText").innerHTML = "Stop";
    animation();
  } else {
    image.setAttribute("src", "./start.svg");
    document.getElementById("startText").innerHTML = "Start";
    isRunning = false;
    stopAnimation();
  }
});
const animate = (lastGen) => {
  let newGen = {};
  for (const key in lastGen) {
    let i = lastGen[key][0] - 1;
    let j = lastGen[key][1] - 1;
    for (; i <= lastGen[key][0] + 1; i++) {
      for (j = lastGen[key][1] - 1; j <= lastGen[key][1] + 1; j++) {
        try {
          let count = 0;
          for (let k = i - 1; k <= i + 1; k++) {
            for (let l = j - 1; l <= j + 1; l++) {
              if (k == i && j == l) continue;
              if (
                document.getElementById(`${k}-${l}`).classList.contains("live")
              )
                count++;
            }
          }
          if (
            count == 3 &&
            document.getElementById(`${i}-${j}`).classList.contains("dead")
          ) {
            newGen[`${i}-${j}`] = [i, j];
          }
          if (
            count == 2 &&
            document.getElementById(`${i}-${j}`).classList.contains("live")
          ) {
            newGen[`${i}-${j}`] = [i, j];
          }
          if (
            count == 3 &&
            document.getElementById(`${i}-${j}`).classList.contains("live")
          ) {
            newGen[`${i}-${j}`] = [i, j];
          }
        } catch (err) {}
      }
    }
  }
  for (const key in lastGen) {
    document.getElementById(key).classList.remove("live");
    document.getElementById(key).classList.add("dead");
  }
  return newGen;
};
const stopAnimation = () => {
  cancelAnimationFrame(animationId);
  // Start the timeout

  // Cancel the timeout
  clearTimeout(timeoutId);
};
document.getElementById("reset").addEventListener("click", () => {
  for (const key in lastGen) {
    document.getElementById(key).classList.remove("live");
    document.getElementById(key).classList.add("dead");
  }
  image.setAttribute("src", "./start.svg");
  document.getElementById("startText").innerHTML = "Start";
  isRunning = false;
  stopAnimation();

  lastGen = {};
  deploy();
});
// for handle
