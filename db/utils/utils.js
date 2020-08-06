exports.formatDates = (list) => {
  const newArticlesArray = list.map((article) => {
    const newObj = { ...article };
    const unformattedDate = newObj.created_at;
    let formattedDate = new Date(unformattedDate);
    newObj.created_at = formattedDate;
    return newObj;
  });
  return newArticlesArray;
};

exports.makeRefObj = (list) => {
  const refObj = {};

  list.forEach((item) => {
    const id = item.article_id;
    const title = item.title;
    refObj[title] = id;
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  const formattedObjects = comments.map((comment) => {
    const newObj = { ...comment };
    const createdByKey = newObj.created_by;
    const time = newObj.created_at;
    const title = newObj.belongs_to;

    newObj.article_id = articleRef[title];
    newObj.author = createdByKey;
    newObj.created_at = new Date(time);
    delete newObj.belongs_to;
    delete newObj.created_by;
    return newObj;
  });
  return formattedObjects;
};
