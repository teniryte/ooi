(() => {

  class Filter {

    init () {
      this.filterElement = document.querySelector('.ooi-filter input');
      this.setEvents();
      this.loadDocs();
    }

    hideDoc (doc) {
      doc.elem.remove();
    }

    showDoc (doc) {
      doc.parent.appendChild(doc.elem);
    }

    showAll () {
      this.docs.forEach(doc => {
        this.showDoc(doc);
      });
    }

    hideAll () {
      this.docs.forEach(doc => {
        this.hideDoc(doc);
      });
    }

    search (value) {
      if (!value || value.length < 3) {
        return this.showAll();
      }
      let docs = this.findDocs(value);
      docs.matched.forEach(doc => this.showDoc(doc));
      docs.notMatched.forEach(doc => this.hideDoc(doc));
    }

    getSectionDocsCount (name) {
      return document.querySelector(`.ooi-contents__sections__section[data-name="${name}"]`).parentElement.parentElement.parentElement.querySelectorAll('.ooi-contents__doc').length;
    }

    findDocs (value) {
      let words = value.toLowerCase().split(' '),
        matched = [],
        notMatched = [];
      this.docs.forEach(doc => {
        let count = 0,
          text = doc.key.toLowerCase();
        words.forEach(word => {
          if (text.includes(word)) {
            count++;
          }
        });
        if (count === words.length) {
          matched.push(doc);

        } else {
          notMatched.push(doc);
        }
      });
      let sections = Array.from(new Set(matched.map(doc => doc.elem.dataset.section)));
      return { matched, notMatched, sections };
    }

    findParent (elem, selector) {
      let parent = elem;
      while (parent && !parent.matches(selector)) {
        parent = parent.parentElement;
      }
      return parent;
    }

    getSectionName (doc) {
      return this
        .findParent(doc.elem, '.section')
        .querySelector('.ooi-contents__sections__section__header')
        .innerHTML
        .split(' ')
        .filter(line => line.length)
        .pop()
        .trim();
    }

    loadDocs () {
      let elems = Array.from(document.querySelectorAll('.ooi-contents__doc')),
        docs = elems.map(elem => {
          let name = elem
              .querySelector('.ooi-contents__doc__header__name')
              .innerHTML,
            type = elem
              .querySelector('.ooi-contents__doc__header__type')
              .innerHTML,
            desc = elem
              .querySelector('.ooi-contents__doc__desc')
              .innerHTML,
            code = elem
              .querySelector('.ooi-contents__doc__code')
              .innerHTML,
            parent = elem.parentElement,
            key = `${type} ${name} ${desc} ${code}`;
          return { elem, type, desc, code, key, parent };
        });
      this.docs = docs;
      return docs;
    }

    setEvents () {
      this.filterElement.addEventListener('keyup', ev => {
        this.search(ev.target.value);
      }, false);
    }

  }

  document.addEventListener('DOMContentLoaded', () => {
    let filter = new Filter();

    filter.init();

    window.f = filter;
  });

})();
