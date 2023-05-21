const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", () => {
  const searchQuery = searchInput.value.trim().toLowerCase();

  // Clear previous search results
  searchResults.innerHTML = "";

  // Filter projects based on search query
  const filteredProjects = projects.filter((project) => {
    return (
      project.projectname.toLowerCase().includes(searchQuery) ||
      project.author.toLowerCase().includes(searchQuery) ||
      project.description.toLowerCase().includes(searchQuery)
    );
  });

  // Render filtered projects
  filteredProjects.forEach((project) => {
    const projectElement = document.createElement("div");
    projectElement.textContent = project.projectname;
    searchResults.appendChild(projectElement);
  });
});
