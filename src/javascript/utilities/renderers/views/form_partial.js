import { build, capitalize } from "../../helpers";
import Partial from "./partial";

class FormPartial extends Partial {
  _form_field(field, interactive_tag) {
    return build(
      { tag: "div", classes: ["form-field"] },
      build({ tag: "label", for: field, textContent: capitalize(field) }),
      (this.input[field] = interactive_tag)
    );
  }

  input_field(
    field,
    {
      value = "",
      type = "text",
      placeholder = "",
      required = false,
      ...attributes
    } = {}
  ) {
    return this._form_field(
      field,
      build({
        tag: "input",
        name: field,
        value,
        placeholder,
        type,
        required,
        ...attributes,
      })
    );
  }

  select_field(field, options, selected_value) {
    return this._form_field(
      field,
      build(
        { tag: "select", name: field },
        ...Object.entries(options).map(([value, textContent]) => {
          return build({
            tag: "option",
            value,
            textContent,
            selected: value === selected_value,
          });
        })
      )
    );
  }

  textarea_field(field, { value, required }) {
    return this._form_field(
      field,
      build({
        tag: "textarea",
        value,
        required,
      })
    );
  }
}

export default FormPartial;
