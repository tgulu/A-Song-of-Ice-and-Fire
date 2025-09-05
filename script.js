async function fetchData() {
  try {
    const id = document.getElementById("characterName").value.toLowerCase();
    const response = await fetch(`https://thronesapi.com/api/v2/Characters`);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }
    const data = await response.json();

    // Find character by name (case-insensitive)
    const character = data.find(
      (char) =>
        char.fullName.toLowerCase().includes(id) ||
        char.firstName.toLowerCase().includes(id) ||
        char.lastName.toLowerCase().includes(id)
    );
    if (character) {
      const characterImg = character.imageUrl;
      const imgElement = document.getElementById("characterImg");

      imgElement.src = characterImg;
      imgElement.alt = character.fullName;
      imgElement.style.display = "block";

      // Add load event to ensure dimensions are maintained
      imgElement.onload = function () {
        this.style.height = "400px";
        this.style.width = "300px";
        this.style.objectFit = "cover";
        this.style.objectPosition = "center";
      };

      // Display character info
      displayCharacterInfo(character);
    } else {
      // Clear image and show error message
      const imgElement = document.getElementById("characterImg");
      imgElement.style.display = "none";
      alert("Character not found. Try a different name.");
    }
  } catch (error) {
    console.error(error);
    alert("Error fetching data. Please try again.");
  }
}

function displayCharacterInfo(character) {
  // Get the existing character info display element
  const infoDiv = document.getElementById("characterInfo");

  // Show the element and populate with character info
  infoDiv.style.display = "block";
  infoDiv.innerHTML = `
    <h3>${character.fullName}</h3>
    <p><strong>Title:</strong> ${character.title || "N/A"}</p>
    <p><strong>Family:</strong> ${character.family || "N/A"}</p>
  `;
}
