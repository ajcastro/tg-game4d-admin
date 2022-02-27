function buildSort(ctx) {
  return ctx.sortDesc ? `-${ctx.sortBy}` : ctx.sortBy
}

export function makeTable(props) {
  return {
    columns: [],
    filter: { search: '' },
    currentPage: 1,
    perPage: 10,
    perPageOptions: [10, 25, 50, 100],
    sortDesc: false,
    sortBy: null,
    totalRows: 0,
    meta: {},
    ...props,
  }
}

export function ctxToParams(ctx) {
  return {
    filter: { ...ctx.filter },
    sort: buildSort(ctx),
    per_page: ctx.perPage,
    page: ctx.currentPage,
  }
}
