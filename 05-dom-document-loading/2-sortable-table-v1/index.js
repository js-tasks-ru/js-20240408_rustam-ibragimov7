export default class SortableTable {
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(this.createTemplate());
    this.sortMarker = this.createElement(this.createMarkerTemplate());
    this.getSubElements();
  }

  createElement(template) {
    const element = document.createElement('div');

    element.innerHTML = template;

    return element.firstElementChild;
  }

  createTemplate() {
    return (
      `<div class="sortable-table">
        <div data-element="header" class="sortable-table__header sortable-table__row">
          ${this.createTableHeaderTemplate()}
        </div>
        <div data-element="body" class="sortable-table__body">
          ${this.createTableBodyTemplate()}
        </div>
      </div>`
    );
  }

  createTableHeaderTemplate() {
    return this.headerConfig.map(cell => (
      `<div class="sortable-table__cell" data-id="${cell.id}" data-sortable="${cell.sortable}">
        <span>
          ${cell.title}
        </span>
      </div>`
    )).join('');
  }

  createTableBodyTemplate() {
    return this.data.map(item => (
      `<a href="#" class="sortable-table__row">
        ${this.createTableRowTemplate(item)}
      </a>`
    )).join('');
  }

  createTableRowTemplate(item) {
    return this.headerConfig.map(
      column => this.createTableColumnTemplate(column)(item[column.id])
    ).join('');
  }

  createTableColumnTemplate(column) {
    if (column.template) {
      return column.template;
    }
    return (value) =>
      `<div class="sortable-table__cell">${value}</div>`;
  }

  createMarkerTemplate() {
    return (
      `<span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>`
    );
  }

  sort(fieldValue = 'title', orderValue = 'asc') {
    const sortField = this.headerConfig.find(column => column.id === fieldValue);

    this.getSortedData(sortField, orderValue);
    this.updateBody();
    this.updateHeader(fieldValue, orderValue);
  }

  getSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(item => {
      this.subElements[item.dataset.element] = item;
    });
  }

  getSortedData(sortField, orderValue) {
    const field = sortField.id;
    const type = sortField.sortType;

    this.data.sort((a, b) => {
      const k = (orderValue === 'asc') ? 1 : -1;

      if (type === 'string') {
        return k * (a[field].localeCompare(b[field], ['ru', 'en'], {caseFirst: "upper"}));
      }
      return k * (a[field] - b[field]);
    });
  }

  updateBody() {
    this.subElements.body.innerHTML = this.createTableBodyTemplate();
  }

  updateHeader(fieldValue, orderValue) {
    this.sortMarker.remove();
    const columnElement = this.subElements.header.querySelector(`[data-id=${fieldValue}]`);

    columnElement.append(this.sortMarker);
    columnElement.dataset.order = orderValue;
  }

  destroy() {
    this.element.remove();
  }
}

