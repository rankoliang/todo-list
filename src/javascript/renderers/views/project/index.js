import _project_elements from "./_elements";
import projectNewButton from "./_new_button";

const projectIndex = function (projects) {
  return [..._project_elements(projects), projectNewButton()];
};

export default projectIndex;
