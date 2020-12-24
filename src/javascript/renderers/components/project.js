import { build } from "../../helpers";

const projectComponent = function (project) {
  const _header = build({ tag: "h2", classes: ["project--title"], textContent: project.title });

  const _title_group = build({ tag: "div", classes: ["project--title-group"] }, _header);

  const pc = build({ tag: "div", classes: ["project"] }, _title_group);

  return pc;
};

export default projectComponent;
