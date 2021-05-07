'use strict';

const _ = require('./ooi');

const state = {
  splitters: {
    code: '```',
    name: '[|s|S]+?',
  },
};

let spl = state.splitters;

module.exports = {

  doc: _.reg(`

    /* Opening */
    /^|s*|/|*|*

      /* Tags */
      (?:|s*(?<tags>[a-zA-Z0-9|.]+)$)?

      /* Info */
      (?:|s*^|s*|*|s*

        /* Section */
        (?<section>${spl.name}) |s*

          : |s*

        /* Name */
        (?<name>[^|(]+) |s*

        /* Args */
        |(|s* (?<args>[|s|S]*?) |s*|) |s*

          => |s*

        (?<result>${spl.name})|s*

      )|s*

      /* Description */
      (?:|s*|*|s*(?<desc>[^$]+?)$)?

      /* Example */
      (?:|s*
        ${spl.code}|s*

          /* Language */
          (?<lang>([a-zA-z0-9_|$]+))|s*

            /* Code */
            (?<code>[|s|S]+)|s*
        ${spl.code}|s*
      )?

    /* Closing */
    |s*|*/gimu

  `),

  require: _.reg(`

    /require|([|'|"](.+?)[|'|"]|)/gm

  `),

};
