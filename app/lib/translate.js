import React from "react";

export const tList = (type, tScope, tElement, properties, values) => {
  return tScope(tElement, {returnObjects: true, replace: values}).map((item, index) => {
    let dangerouslySetInnerHTML;

    if (properties && "dangerouslySetInnerHTML" in properties) {
      dangerouslySetInnerHTML = {"dangerouslySetInnerHTML": {"__html": item}};
      item = null;
    }

    return React.createElement(
      type,
      Object.assign({key: index}, properties, dangerouslySetInnerHTML),
      item,
    );
  });
};
