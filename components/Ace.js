import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";

const Ace = ({ onChange, ...props }) => {
  return (
    <AceEditor
      mode="json"
      theme="dracula"
      onChange={(values) => onChange(values)}
      name="sup"
      {...props}
    />
  );
};

export default Ace;
