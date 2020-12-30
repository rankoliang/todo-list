import _project_elements from "./_elements";
import ProjectFormPartial from "./_form_partial";
import projectNewButton from "./_new_button";

const projectNew = function (projects, project) {
  return [
    ..._project_elements(projects),
    new ProjectFormPartial({ project }).titleGroup,
    projectNewButton(),
  ];
};

export default projectNew;
