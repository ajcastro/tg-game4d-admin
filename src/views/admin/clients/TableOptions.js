export default class TableOptions {
  static make() {
    return {
      columns: [],
      filter: { search: '' },
      currentPage: 1,
      perPage: 10,
      perPageOptions: [10, 25, 50, 100],
      isSortDirDesc: false,
      sortBy: null,
      totalRows: 0,
      meta: [],
    }
  }

  static toQueryParams(ctx) {
    return { ...ctx }
  }
}
