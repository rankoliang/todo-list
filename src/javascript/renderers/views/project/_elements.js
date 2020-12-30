import ProjectPartial from "./_partial";

const _project_elements = function (projects) {
  return projects.map((project) => new ProjectPartial({ project }).element);
};

export default _project_elements;
