document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("colorfulTable");
  const paletteButton = document.getElementById("paletteButton");
  const paletteMenu = document.getElementById("paletteMenu");

  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];

  colors.forEach((color) => {
    const colorDiv = document.createElement("div");
    colorDiv.className = "color";
    colorDiv.style.backgroundColor = color;

    colorDiv.addEventListener("click", () => {
      selectedColor = color;
      hidePaletteMenu();
      updatePaletteButtonColor();
    });

    paletteMenu.appendChild(colorDiv);
  });

  let selectedColor = colors[0];

  for (let i = 0; i < 6; i++) {
    const row = table.insertRow();
    for (let j = 0; j < 6; j++) {
      const cell = row.insertCell();
      const number = i * 6 + j + 1;
      cell.textContent = number;

      cell.addEventListener("mouseover", () => {
        if (cell.textContent == 14) {
        cell.style.backgroundColor = getRandomColor();
        }
      });

      cell.addEventListener("click", () => {
        cell.style.backgroundColor = selectedColor;
      });

      cell.addEventListener("dblclick", () => {
        toggleDiagonalColors(i);
      });
    }
  }

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  function toggleDiagonalColors(rowIndex) {
    const rows = table.rows;

    for (let i = 0, j = 5; i < rows.length, j >= 0; i++, j--) {
      const cells = rows[i].cells;
      
        cells[j].style.backgroundColor = selectedColor;
      
    }
  }

  function showPaletteMenu() {
    paletteMenu.style.display = "block";
  }

  function hidePaletteMenu() {
    paletteMenu.style.display = "none";
  }

  paletteButton.addEventListener("click", () => {
    if (paletteMenu.style.display === "none" || paletteMenu.style.display === "") {
      showPaletteMenu();
    } else {
      hidePaletteMenu();
    }
  });

  function updatePaletteButtonColor() {
    paletteButton.style.backgroundColor = selectedColor;
  }
});
