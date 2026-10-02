// TalentHub Recruiters - job loading, live filters and accessible job details modal

const jobGrid = document.getElementById("jobGrid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");
const wishlistCount = document.getElementById("wishlistCount");

const WISHLIST_STORAGE_KEY = "talenthubWishlist";

const jobModal = document.getElementById("jobModal");
const closeModalButton = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalCompany = document.getElementById("modalCompany");
const modalMeta = document.getElementById("modalMeta");
const modalDescription = document.getElementById("modalDescription");
const applyButton = document.getElementById("applyButton");
const applyStatus = document.getElementById("applyStatus");

let allJobs = [];
let previouslyFocusedElement = null;
let wishlist = loadWishlist();

function loadWishlist() {
  try {
    const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed.filter(id => typeof id === "string") : [];
  } catch (error) {
    console.warn("Could not read the saved wishlist:", error);
    return [];
  }
}

function saveWishlist() {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    return true;
  } catch (error) {
    console.error("Could not save the wishlist:", error);
    return false;
  }
}

// Use an explicit job ID when available, otherwise build a stable key from job details.
function getJobId(job) {
  if (job.id !== undefined && job.id !== null) return String(job.id);
  return [job.title, job.company, job.location].map(normalize).join("|");
}

function updateWishlistCount() {
  const count = wishlist.length;
  wishlistCount.innerHTML = `♥ Saved jobs: <strong>${count}</strong>`;
  wishlistCount.setAttribute("aria-label", `${count} ${count === 1 ? "job" : "jobs"} saved`);
}

function updateWishlistButton(button, job) {
  const isSaved = wishlist.includes(getJobId(job));
  button.classList.toggle("is-saved", isSaved);
  button.textContent = isSaved ? "♥" : "♡";
  button.setAttribute("aria-pressed", String(isSaved));
  button.setAttribute("aria-label", `${isSaved ? "Remove" : "Add"} ${job.title || "this job"} ${isSaved ? "from" : "to"} wishlist`);
}

function toggleWishlist(job, button) {
  const jobId = getJobId(job);
  if (wishlist.includes(jobId)) {
    wishlist = wishlist.filter(id => id !== jobId);
  } else {
    wishlist.push(jobId);
  }

  const saved = saveWishlist();
  updateWishlistCount();
  updateWishlistButton(button, job);
  if (!saved) {
    wishlistCount.setAttribute("title", "Your browser could not save changes to local storage.");
  } else {
    wishlistCount.removeAttribute("title");
  }
}

function normalize(value) {
  return String(value ?? "").trim().toLocaleLowerCase();
}

function showError(message) {
  jobGrid.replaceChildren();
  resultsCount.textContent = message;
  noResults.hidden = true;
}

function fillCategoryDropdown(jobs) {
  const categories = [...new Set(
    jobs.map(job => String(job.category ?? "").trim()).filter(Boolean)
  )].sort((a, b) => a.localeCompare(b));

  categorySelect.replaceChildren(new Option("All categories", "all"));
  categories.forEach(category => categorySelect.add(new Option(category, category)));
}

function openJobModal(job, triggerElement) {
  previouslyFocusedElement = triggerElement;

  modalTitle.textContent = job.title || "Untitled position";
  modalCategory.textContent = job.category || "General";
  modalCompany.textContent = job.company || "Company not specified";
  modalMeta.textContent = [job.location, job.type].filter(Boolean).join(" · ");
  modalDescription.textContent =
    job.description || "No additional description is available for this position.";
  applyStatus.textContent = "";
  applyButton.dataset.applyUrl = job.applyUrl || "";

  jobModal.hidden = false;
  jobModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  // Move keyboard focus into the dialog after it becomes visible.
  closeModalButton.focus();
}

function closeJobModal() {
  if (jobModal.hidden) return;

  jobModal.hidden = true;
  jobModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
  }
}

function createJobCard(job) {
  const card = document.createElement("article");
  card.className = "job-card";
  card.tabIndex = 0;
  card.setAttribute("role", "group");
  card.setAttribute("aria-haspopup", "dialog");
  card.setAttribute("aria-label", `View details for ${job.title || "job"} at ${job.company || "company"}`);

  const image = document.createElement("div");
  image.className = "card-image";
  image.textContent = job.category || "General";
  image.setAttribute("aria-hidden", "true");

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = job.title || "Untitled position";

  const company = document.createElement("p");
  company.className = "card-company";
  company.textContent = job.company || "Company not specified";

  const meta = document.createElement("p");
  meta.className = "card-meta";
  meta.textContent = [job.location, job.type].filter(Boolean).join(" · ");

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const hint = document.createElement("span");
  hint.className = "card-hint";
  hint.textContent = "View job details";

  const wishlistButton = document.createElement("button");
  wishlistButton.type = "button";
  wishlistButton.className = "wishlist-button";
  wishlistButton.addEventListener("click", event => {
    event.stopPropagation();
    toggleWishlist(job, wishlistButton);
  });
  wishlistButton.addEventListener("keydown", event => event.stopPropagation());
  updateWishlistButton(wishlistButton, job);

  actions.append(hint, wishlistButton);
  body.append(title, company, meta, actions);
  card.append(image, body);

  card.addEventListener("click", () => openJobModal(job, card));
  card.addEventListener("keydown", event => {
    if (event.target !== card) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openJobModal(job, card);
    }
  });

  return card;
}

function renderJobs(jobs) {
  const fragment = document.createDocumentFragment();
  jobs.forEach(job => fragment.appendChild(createJobCard(job)));
  jobGrid.replaceChildren(fragment);

  noResults.hidden = jobs.length !== 0;
  updateWishlistCount();
  resultsCount.textContent = `${jobs.length} ${jobs.length === 1 ? "job" : "jobs"} found`;
}

function applyFilters() {
  const searchText = normalize(searchInput.value);
  const selectedCategory = normalize(categorySelect.value);

  const filteredJobs = allJobs.filter(job => {
    const searchableText = [
      job.title, job.company, job.location, job.type,
      job.category, job.description
    ].map(normalize).join(" ");

    const matchesSearch = searchText === "" || searchableText.includes(searchText);
    const matchesCategory =
      selectedCategory === "all" || normalize(job.category) === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderJobs(filteredJobs);
}

async function loadJobs() {
  try {
    const response = await fetch("jobs.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Could not load jobs.json (HTTP ${response.status}).`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("jobs.json must contain a JSON array of jobs.");
    }

    allJobs = data.filter(job => job && typeof job === "object" && !Array.isArray(job));
    if (allJobs.length === 0) {
      throw new Error("No valid job records were found in jobs.json.");
    }

    fillCategoryDropdown(allJobs);
    applyFilters();
  } catch (error) {
    console.error("Job loading error:", error);
    showError(`${error.message} Run this project with VS Code Live Server, then refresh.`);
  }
}

// Modal close controls: close button, backdrop click and Escape key.
closeModalButton.addEventListener("click", closeJobModal);

jobModal.addEventListener("click", event => {
  if (event.target === jobModal) closeJobModal();
});

document.addEventListener("keydown", event => {
  if (jobModal.hidden) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeJobModal();
    return;
  }

  // Keep Tab navigation inside the open dialog.
  if (event.key === "Tab") {
    const focusable = [...jobModal.querySelectorAll(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )].filter(element => element.offsetParent !== null);

    if (focusable.length === 0) {
      event.preventDefault();
      closeModalButton.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

// A real application URL can be added to a job as "applyUrl" in jobs.json.
// Do not invent an application destination when the data does not provide one.
applyButton.addEventListener("click", () => {
  const applyUrl = applyButton.dataset.applyUrl;

  if (applyUrl) {
    window.open(applyUrl, "_blank", "noopener,noreferrer");
  } else {
    applyStatus.textContent = "An application link has not been provided for this job yet.";
  }
});

searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);

updateWishlistCount();
loadJobs();
