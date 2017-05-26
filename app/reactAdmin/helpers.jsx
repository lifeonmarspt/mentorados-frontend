import React from "react";
import PropTypes from "prop-types";


const ShowInsideSpan = ({ resource, fieldMetadata }) => (
  <span>{resource[fieldMetadata.id]}</span>
);

class NoOpProvider extends React.Component {
  render() {
    return React.Children.only(this.props.children);
  }
}

export const DisplayComponent = ({ fieldMetadata, ...rest }, { choices }) => {
  const DisplayAs = fieldMetadata.displayAs || ShowInsideSpan;

  return <DisplayAs
    fieldMetadata={fieldMetadata}
    choices={choices}
    {...rest}
  />
};

DisplayComponent.contextTypes = {
  choices: PropTypes.array,
};

export const ShowComponent = ({ fieldMetadata, ...rest }) => {
  const ChoicesProvider = fieldMetadata.choicesProvider || NoOpProvider;

  return (
    <ChoicesProvider>
      <DisplayComponent
        fieldMetadata={fieldMetadata}
        {...rest}
      />
    </ChoicesProvider>
  );
};

export const EditComponent = ({ fieldMetadata, resource, onChange, errors }) => {
  const EditableAs = fieldMetadata.editableAs || fieldMetadata.displayAs || ShowInsideSpan;
  const ChoicesProvider = fieldMetadata.choicesProvider || NoOpProvider;

  return (
    <ChoicesProvider>
      <EditableAs
        fieldMetadata={fieldMetadata}
        resource={resource}
        onChange={onChange}
        errors={errors}
      />
    </ChoicesProvider>
  );
};

export const defaultRoutes = (resourceName, { prefix } = { prefix: "" }) => ({
  show: (id) => `${prefix}/${resourceName}/${id}`,
  edit: (id) => `${prefix}/${resourceName}/${id}/edit`,
  delete: (id) => `${prefix}/${resourceName}/${id}/delete`,
  new: () => `${prefix}/${resourceName}/new`,
  index: () => `${prefix}/${resourceName}`,
});

export const defaultActions = ({ api, routes }) => ({
  index: () => api.get(routes.index()),
  show: (id) => api.get(routes.show(id)),
  create: (data) => api.post(routes.index(), data),
  update: (id, data) => api.put(routes.show(id), data),
  destroy: (id) => api.delete(routes.show(id)),
});
