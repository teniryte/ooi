const _ = require('ooi');
const fs  = require('fs');
const path  = require('path');
const showdown  = require('showdown');
const util  = require('./util');

const opts = {
  // completeHTMLDocument: true,
  // omitExtraWLInCodeBlocks: true,
  // noHeaderId: true,
  // customizedHeaderId: true,
  // ghCompatibleHeaderId: true,
  // prefixHeaderId: true,
  // headerLevelStart: 1,
  // parseImgDimensions: true,
  // simplifiedAutoLink: true,
  // literalMidWordUnderscores: true,
  // strikethrough: true,
  // tables: true,
  // ghCodeBlocks: true,
  // tasklists: true,
  // smoothLivePreview: true,
  // smartIndentationFix: true,
  // disableForced4SpacesIndentedSublists: true,
  // simpleLineBreaks: true,
  // requireSpaceBeforeHeadingText: true,
  // ghMentions: true,
  // ghMentionsLink: 'https://github.com/teniryte',
  // encodeEmails: true,
  // openLinksInNewWindow: true,
  // backslashEscapesHTMLTags: true,
  // emoji: true,
  // underline: true,
  // metadata: true,
  // splitAdjacentBlockquotes: true,
};

let converter = new showdown.Converter(opts),
  htmlFiles = fs.readdirSync(path.resolve(__dirname, '../html/showdown')),
  mdFilename = path.resolve(__dirname, `../../README.md`),
  htmlFilename = path.resolve(__dirname, `../html/showdown/index-${htmlFiles.length + 1}.html`),
  mdCode = fs.readFileSync(mdFilename, 'utf-8'),
  htmlCode = converter.makeHtml(mdCode);

fs.writeFileSync(htmlFilename, util.html(htmlCode));

console.info(`File «${htmlFilename}» created successfully!`);
