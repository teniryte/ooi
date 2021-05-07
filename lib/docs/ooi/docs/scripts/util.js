module.exports = {
  html (code) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <title>|ooi|</title>
        <link rel="stylesheet" href="../../assets/css/reset.css">
        <link rel="stylesheet" href="../../assets/css/common.css">
        <link rel="stylesheet" href="../../assets/css/markdown/github.css">
      </head>
      <body>
        <div class="markdown-body">
          ${code}
        </div>
      </html>
    `;
  },
};
