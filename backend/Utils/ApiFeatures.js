class ApiFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  search(field) {
    if (this.queryString.keywords && this.queryString.keywords !== "") {
      const keywordRegex = new RegExp(this.queryString.keywords, "i");
      this.query.find({ field: keywordRegex });
    } else {
      this.query.find({});
    }
    return this;
  }
  pagination(limit = 10, Model) {
    const page = +this.queryString.page || 1;
    const limit = +limit;
    const skip = (page - 1) * limit;
    const count = Model.countDocuments();
    const totalPages = Math.ceil(count / limit);
    return this;
  }
}
