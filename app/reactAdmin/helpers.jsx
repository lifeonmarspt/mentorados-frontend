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

export const defaultRoutes = (resourceName) => ({
  show: (id) => `/admin/${resourceName}/${id}`,
  edit: (id) => `/admin/${resourceName}/${id}/edit`,
  new: () => `/admin/${resourceName}/new`,
  list: () => `/admin/${resourceName}`,
});
