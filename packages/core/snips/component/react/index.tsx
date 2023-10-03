import './style.css';
import React from "react";

interface Props {}
function {{name}}(props: Props) {
  return <div className="{{rootCls}}">
    {{name}} here!
  </div>
}

{{name}}.displayName = '{{name}}';
export default {{name}};