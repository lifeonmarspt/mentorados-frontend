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
