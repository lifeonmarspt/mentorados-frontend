import React from "react";
import PropTypes from "prop-types";


const ShowInsideSpan = ({ resource, field }) => (
  <span>{resource[field]}</span>
);

class NoOpProvider extends React.Component {
  render() {
    return React.Children.only(this.props.children);
  }
}

export const DisplayComponent = ({ field, metadata, ...rest }, { choices }) => {
  const DisplayAs = metadata.fields[field].displayAs || ShowInsideSpan;

  return <DisplayAs
    field={field}
    metadata={metadata}
    choices={choices}
    {...rest}
  />
};

DisplayComponent.contextTypes = {
  choices: PropTypes.array,
};

export const ShowComponent = ({ field, metadata, ...rest }) => {
  const ChoicesProvider = metadata.fields[field].choicesProvider || NoOpProvider;

  return (
    <ChoicesProvider>
      <DisplayComponent
        field={field}
        metadata={metadata}
        {...rest}
      />
    </ChoicesProvider>
  );
};

export const EditComponent = ({ field, metadata, ...rest }) => {
  const EditableAs = metadata.fields[field].editableAs || metadata.fields[field].displayAs || ShowInsideSpan;
  const ChoicesProvider = metadata.fields[field].choicesProvider || NoOpProvider;

  return (
    <ChoicesProvider>
      <EditableAs
        field={field}
        metadata={metadata}
        {...rest}
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
