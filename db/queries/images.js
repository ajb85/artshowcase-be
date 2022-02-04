import { queryBuilder } from "../";

const defaultQueries = queryBuilder("images AS i");
const progressImageQueries = queryBuilder("progress_images");

export function find(filter) {
  return defaultQueries
    .find(filter)
    .select(
      "i.id",
      "i.name",
      "i.description",
      "i.link",
      "i.private",
      "i.created_at",
      "i.updated_at",
      defaultQueries.db.raw(
        "CASE WHEN count(pi) = 0 THEN '[]' ELSE json_agg(json_build_object('id', pi.id, 'link', pi.link, 'order', pi.order) ORDER BY pi.order ASC) END AS progress"
      )
    )
    .leftJoin("progress_images AS pi", { "pi.image_id": "i.id" })
    .groupBy("i.id");
}

export function add(data) {
  const { progress, ...d } = data;
  return defaultQueries.add(d).then(async ([{ id }]) => {
    await Promise.all(
      progress.map((p) => progressImageQueries.add({ ...p, image_id: id }))
    );
    return find({ "i.id": id }).first();
  });
}

export function edit(filter, data) {
  const { id, progress, ...d } = data;

  return defaultQueries.edit(filter, d).then(async ([{ id }]) => {
    const existing = await progressImageQueries.find({ image_id: id });
    await Promise.all(
      progress.map(({ id: pid, order, link }) => {
        if (existing.find((e) => e.id === pid)) {
          return link
            ? progressImageQueries.edit({ order, link })
            : progressImageQueries.remove(pid);
        } else {
          return progressImageQueries.add({
            link,
            order: order || existing.length + 1,
            image_id: id,
          });
        }
      })
    );
    return find({ "i.id": id }).first();
  });
}

export const { remove } = defaultQueries;
