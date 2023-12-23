import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
    toolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }, { header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ 'color': [] }, { 'background': [] }],
      ["link", "image"],
      ["clean"],
    ],
};

const Quill = ({data, SetData}) => {

    const ref = React.useRef(null);

    // Disable spellcheck as component is mounted
    React.useEffect(() => {
      ref.current?.editor.root.setAttribute("spellcheck", "false");
    }, []);
  

    return (
        <ReactQuill
          ref={ref}
          theme="snow"
          value={data}
          onChange={SetData}
          modules={modules}
          scrollingContainer={".paper"}
          placeholder="Type your data"
        />
    )
}

export default Quill;