const projectComponent = function (project) {
  const _header = (function () {
    const component = document.createElement("h2");
    component.classList.add("project--title");
    component.textContent = project.title;

    return component;
  })();

  const _title_group = (function () {
    const component = document.createElement("div");
    component.classList.add("project--title-group");

    [_header].forEach((child) => {
      component.appendChild(child);
    });

    return component;
  })();

  const pc = (function () {
    const component = document.createElement("div");
    component.classList.add("project");

    [_title_group].forEach((child) => {
      component.appendChild(child);
    });

    return component;
  })();

  return pc;
};

export default projectComponent;
