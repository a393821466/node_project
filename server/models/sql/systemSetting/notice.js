class noticeBoard {
  constructor() {}
  static async addNotice(ctx) {
    let query = ctx.request.body,
      data = {
        title: query.title,
        types: query.types,
        sortList: query.sort,
        editBox: query.text
      }
  }
}
