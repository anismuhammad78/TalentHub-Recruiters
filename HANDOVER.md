# Client Hand-over Note — TalentHub Recruiters

**Project:** TalentHub Recruiters job catalogue  
**Delivery:** Static website built with HTML, CSS and vanilla JavaScript  
**Repository:** https://github.com/anismuhammad78/TalentHub-Recruiters  
**Expected live URL:** https://anismuhammad78.github.io/TalentHub-Recruiters/  

> The live URL is ready to use once GitHub Pages has been enabled and its deployment has completed. Confirm the published status in the repository's **Settings → Pages** before sharing it as live.

## Handover summary

The website provides a responsive catalogue of job opportunities. Visitors can search listings, filter by category, open a job details dialog, and save jobs to a wishlist. Job listing content is maintained in a JSON file, while the front end is implemented with standard HTML, CSS and JavaScript.

## Files the client should know

- `index.html` — page structure and accessible job details dialog.
- `css/styles.css` — visual design, responsive layout, and modal/card styling.
- `js/app.js` — loading job data, search, category filtering, modal behavior, and wishlist logic.
- `data/jobs.json` — job listing content. This is the main file to edit when adding or updating jobs.
- `README.md` — setup, usage, and GitHub Pages deployment instructions.

## Routine maintenance

### Add, edit, or remove jobs

1. Open `data/jobs.json` in a code editor.
2. Add, edit, or remove a job object. Preserve valid JSON syntax and use a unique `id` for every job.
3. Keep property names and value types consistent with the existing records.
4. Add a useful description and a valid `applyUrl` where appropriate.
5. Test locally with VS Code Live Server before publishing.

### Update the website

1. Make changes in the appropriate HTML, CSS, JavaScript, or JSON file.
2. Test search, category filters, job details, keyboard controls, and wishlist behavior.
3. Check the browser developer console for errors.
4. Commit the changes and push them to the branch configured in GitHub Pages (currently intended to be `main`, `/root`).
5. Wait for GitHub Pages to finish deploying, then verify the live website.

### Wishlist and visitor data

The wishlist is stored in the visitor's browser `localStorage` under the key `talenthubWishlist`. It is not stored on the GitHub repository or a central server. It does not automatically synchronize between devices or browsers. Visitors may lose the saved list if they clear site data or browser storage.

## Troubleshooting

- **GitHub Pages shows 404:** Confirm Pages is enabled, the correct branch and `/(root)` folder are selected, and `index.html` is in the repository root.
- **No job cards appear:** Confirm `data/jobs.json` exists at the expected path, contains valid JSON, and was pushed to GitHub.
- **CSS or JavaScript is missing:** Check that `css/styles.css` and `js/app.js` are in the expected folders and that paths in `index.html` match their names and capitalization.
- **Wishlist does not persist:** Test in the same browser and site URL, ensure browser storage is enabled, and avoid private browsing sessions that clear storage when closed.
- **Changes are not visible:** Confirm the commit was pushed, wait for the Pages deployment to finish, and hard-refresh the browser.

## Recommended future enhancements

- Add a secure admin interface or content-management process for maintaining job listings.
- Connect to a backend/database if job listings need centralized management.
- Add server-side application submission and validation if applications should be collected by the site.
- Add user accounts and server-side wishlist synchronization if visitors need the same saved jobs across devices.
- Add automated accessibility, browser, and link checks before each release.
- Add a privacy notice describing any personal data collected if forms, analytics, or tracking are introduced.

## Final acceptance checklist

- [ ] GitHub repository contains the complete website files in the intended publishing directory.
- [ ] GitHub Pages is enabled and reports a successful deployment.
- [ ] Published URL opens successfully over HTTPS.
- [ ] Job data loads on the live website.
- [ ] Search and category filtering work.
- [ ] Job details dialog opens and closes with mouse and keyboard.
- [ ] Wishlist buttons and saved-jobs counter work.
- [ ] Wishlist survives a page refresh in the same browser.
- [ ] README and this hand-over note are present in the repository.

**Handover status:** Documentation prepared. Live deployment and final browser verification must be completed by the repository owner and checked against the acceptance checklist above.
