import React from "react";


export const ShowComponent = ({ fieldMetadata, resource, }) => {
  const displayAs = fieldMetadata.displayAs ||
    ((r) => r[fieldMetadata.id]);

  return <span>{displayAs(resource)}</span>;
};

export const EditComponent = ({ fieldMetadata, resource, onChange, errors, }) => {
  const EditableAs = fieldMetadata.editableAs ||
    (({ fieldMetadata, resource }) => ShowComponent({ fieldMetadata, resource }));

  return <EditableAs
    fieldMetadata={fieldMetadata}
    resource={resource}
    onChange={onChange}
    errors={errors}
  />
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
