async function fetchData() {
  try {
    const id = document.getElementById("characterName").value.toLowerCase();
    const response = await fetch(`https://thronesapi.com/api/v2/Characters`);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }
    const data = await response.json();
  } catch (error) {
    console.error(error);
    alert("Error fetching data. Please try again.");
  }

  // Find character by name (case-insensitive)
  const character = data.find(
    (char) =>
      char.fullName.toLowerCase().includes(id) ||
      char.firstName.toLowerCase().includes(id) ||
      char.lastName.toLowerCase().includes(id)
  );
}
