This is fix to an issue that arose sometime between 2021-07-21 and 2021-07-24. 

See:
- https://github.community/t/github-pages-breaks-upon-adding-assets-css-style-scss/191906

A hack-fix is to run Jekyll locally and then copy the locally generated style.css into a file that is referenced by assets/css/style.scss

```
---
---

@import "2021-07-25-pages-fix-cayman-sass/generated-style.css";
... your customisation here
```