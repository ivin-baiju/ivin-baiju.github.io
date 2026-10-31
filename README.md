# Ivin Baiju — Portfolio

A responsive, static personal portfolio inspired by the supplied Codeforge reference site. The visual system keeps its charcoal/orange palette, technical grid, strong typography, concise content sections, and restrained motion, while making the content personal to Ivin.

## Run locally

No build step or package installation is required.

```bash
# from this directory
python3 -m http.server 8000
```

Open http://localhost:8000.

You can also open `index.html` directly, but running a local server is recommended for a more realistic preview.

## Deploy

This is a plain HTML/CSS/JavaScript site. Upload the folder contents to the public web root of any static host, or deploy the folder with GitHub Pages, Netlify, Vercel, or Hostinger.

## Update your profile

Edit `index.html` to update your intro, projects, skills, education, certifications, and social links. Project detail copy for the modal lives in `assets/script.js`.

Known social links currently included:

- GitHub: https://github.com/ivin-baiju
- LinkedIn: https://in.linkedin.com/in/ivin-baiju
- Instagram: https://www.instagram.com/l_lvin_18/
- X: https://x.com/Gargantuaq1

No email address or resume file was supplied, so neither has been invented or linked. Add one when you are ready.

## Notes

- Project states are deliberately labelled as in development, concept/prototype, or research track.
- The site uses Google Fonts (Manrope and Barlow Condensed) when online and falls back to system fonts if unavailable.
- Animations respect `prefers-reduced-motion`.
