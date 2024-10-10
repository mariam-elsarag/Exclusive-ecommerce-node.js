class ApiFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["keywords", "page", "limit", "fields", "sort"];
    excludedFields.forEach((item) => delete queryObj[item]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  search(fields = []) {
    if (this.queryString.keywords && this.queryString.keywords.trim() !== "") {
      const keyword = new RegExp(this.queryString.keywords, "i");

      const searchQuery = fields.length
        ? { $or: fields.map((field) => ({ [field]: keyword })) }
        : {};

      this.query = this.query.find(searchQuery);
    }
    return this;
  }
  pagination(limitation = 10) {
    const page = +this.queryString.page || 1;
    const limit = +limitation;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    this.page = page;
    this.limit = limit;

    return this;
  }
  async getPaginations(Model, req) {
    const count = await Model.countDocuments(this.query.getFilter());
    const totalPages = Math.ceil(count / this.limit);
    const data = await this.query;
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${
      req.path
    }`;
    return {
      page: this.page,
      pages: totalPages,
      count: count,
      next: this.page < totalPages ? `${baseUrl}?page=${this.page + 1}` : null,
      previouse: this.page > 1 ? `${baseUrl}?page=${this.page - 1}` : null,
      results: data,
    };
  }
}

module.exports = ApiFeature;
