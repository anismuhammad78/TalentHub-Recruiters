# TalentHub Recruiters

TalentHub Recruiters is a responsive, browser-based job catalogue built with **HTML, CSS and vanilla JavaScript**. It loads job listings from a JSON file and lets visitors search, filter, view job details, and save jobs to a personal wishlist.

## Live website

**GitHub Pages URL:** https://anismuhammad78.github.io/TalentHub-Recruiters/

> This is the expected Pages address for the repository. It becomes publicly accessible after GitHub Pages is enabled and the first deployment completes. If your GitHub username or repository name changes, update this link.

**GitHub repository:** https://github.com/anismuhammad78/TalentHub-Recruiters

## Features

- Responsive job catalogue for desktop, tablet and mobile screens.
- Job listings loaded dynamically from `data/jobs.json` using the Fetch API.
- Live keyword search across job information.
- Category filtering; search and category filters can be used together.
- Accessible job details dialog with job information and an Apply Now action.
- Dialog keyboard support: Enter/Space to open a focused card, Escape to close, and focus management while the dialog is open.
- Wishlist heart button on each job card.
- Saved-jobs counter that updates when jobs are added or removed.
- Wishlist saved in browser `localStorage` and restored on later visits using the same browser and site origin.
- Helpful error and empty-results messages.

## Project structure

```text
TalentHub-Recruiters/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── data/
│   └── jobs.json
├── assets/
│   └── images/
└── README.md
```

`HANDOVER.md` contains the client hand-over note and maintenance guidance.

## Run locally

The project does not require a build step or package installation.

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Install the **Live Server** extension if needed.
4. Right-click `index.html` and select **Open with Live Server**.
5. Your browser will open the site on a local address, usually similar to `http://127.0.0.1:5500/`.

Do not open `index.html` directly using a `file://` URL. The app uses `fetch()` to load `data/jobs.json`, which requires the page to be served over HTTP or HTTPS.

## How to use the website

1. Browse the job cards on the home page.
2. Enter a keyword in the search box to find matching jobs.
3. Choose a category from the category dropdown to narrow the listings.
4. Select a job card to open its details dialog. Use the close button, click the overlay, or press Escape to close it.
5. Select the heart button on a job card to add it to your wishlist. Select it again to remove the job.
6. Check **Saved jobs** to see the current wishlist count.
7. Refresh the page to confirm saved jobs are restored. Wishlist data is stored locally in the browser; it is not synced between different browsers or devices.
8. Use **Apply Now** when a valid application URL is available for that job.

## Maintain the job catalogue

Job records are stored in `data/jobs.json`. To add or update a listing:

1. Open `data/jobs.json` in a text editor.
2. Add or edit a job object while keeping valid JSON syntax.
3. Keep each job's identifying fields consistent. The application uses job data to render cards, details and wishlist state.
4. Include a meaningful `description` for the details dialog.
5. Add an `applyUrl` property containing a valid application URL when one is available. If there is no application link, leave that property out.
6. Save the file and reload the site to check the listing.

Example job record (adapt the fields to match the existing records in `jobs.json`):

```json
{
  "id": "unique-job-id",
  "title": "Frontend Developer",
  "company": "Example Company",
  "location": "Islamabad",
  "type": "Full-time",
  "category": "Technology",
  "description": "Build and maintain accessible web interfaces.",
  "applyUrl": "https://example.com/careers"
}
```

When adding a job, use a unique `id` and follow the same field names and data types already used in `data/jobs.json`.

## Deploy to GitHub Pages

### A. Put the website files in the repository root

For the simplest Pages setup, the repository root should contain `index.html`, `css/`, `js/`, and `data/` directly. Do not leave the website nested inside an extra `job-board/` directory unless you deliberately configure Pages to publish that directory through a supported workflow.

### B. Commit and push changes

Using GitHub Desktop:

1. Open the `TalentHub-Recruiters` repository in GitHub Desktop.
2. Confirm the changed files are listed.
3. Enter a summary such as `Complete Task 5 documentation and prepare GitHub Pages deployment`.
4. Select **Commit to main**.
5. Select **Push origin**.

Or use a terminal opened in the repository folder:

```bash
git status
git add .
git commit -m "Prepare project for GitHub Pages deployment"
git push origin main
```

If Git reports that there is nothing to commit, check that you opened the correct repository folder and that the updated files are saved.

### C. Enable GitHub Pages

1. Open the repository: https://github.com/anismuhammad78/TalentHub-Recruiters
2. Select **Settings**.
3. In the left sidebar, open **Pages** (under **Code and automation**).
4. Under **Build and deployment**, choose **Deploy from a branch** as the source.
5. Choose branch **main** and folder **/(root)**.
6. Select **Save**.
7. Return to the Pages settings page and wait for the deployment status to show that the site has been published. The first deployment can take a few minutes.
8. Open the published URL shown by GitHub Pages. It should match the Live website URL above.

### D. Verify the published website

Open the Pages URL in a private/incognito window and check:

- The home page loads over HTTPS without a 404 error.
- Job cards appear (this confirms `data/jobs.json` loaded).
- Search and category filtering work.
- Selecting a card opens the details dialog; close button, overlay and Escape all close it.
- Heart buttons add and remove jobs and the saved-jobs counter changes.
- Refreshing the page preserves the wishlist in the same browser.
- The layout works at desktop and mobile widths.
- Apply Now behaves as expected for jobs with and without an `applyUrl`.

If the page loads but jobs do not appear, check that `data/jobs.json` is in the repository at exactly that path and that the browser console has no 404 or JavaScript errors.

## Important notes

- GitHub Pages hosts static files. This project currently has no server, database, user accounts, or centralized job-management dashboard.
- The wishlist is private to the visitor's browser storage. Clearing browser data, using another browser/device, or changing the website origin can make the saved list unavailable.
- Only publish job information and application links that you are authorized to share.
- Every code or data update must be committed and pushed to the configured GitHub Pages source branch before it appears on the live site.

## Support and maintenance

See [HANDOVER.md](HANDOVER.md) for routine maintenance, troubleshooting, and future enhancement suggestions.
