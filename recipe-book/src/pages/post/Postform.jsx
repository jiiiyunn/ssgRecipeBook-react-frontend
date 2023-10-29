import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import DOMPurify from "dompurify";

function stripHtmlTags(html) {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
}

function PostForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    contents: "",
  });

  const { title, contents } = form;

  // ReactQuill 정리
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike"], 
        [{ color: [] }, { background: [] }], 
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "link", "code-block", "image"]
      ],
    }
  }

  const onChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 다음페이지로 넘어가기
  const nextPage = () => {
    navigate(
      `/posts/forms/ingredients?title=${encodeURIComponent(title)}&contents=${encodeURIComponent(contents)}`
    );
  };

  // 페이지 새로고침 혹은 창닫기 시도시 경고 메세지 출력
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        "변경사항이 저장되지 않을 수 있습니다. 정말 페이지를 나가시겠습니까?";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <div className="recipebox">
        <h1 style={{ fontWeight: "bold" }}>레시피 등록</h1>
        <hr />

        <div>요리 이름</div>
        <input
          type="text"
          name="title"
          value={title}
          style={{ width: "99%" }}
          onChange={(e) => onChange("title", e.target.value)}/> 

        <div>레시피 내용</div>
        <ReactQuill
          value={contents}
          onChange={(value) => onChange("contents", value)}
          modules={modules} 
          style={{ height: "400px", width: "100%" }} // 에디터의 높이와 너비 설정
          />

        <button style={{ marginTop: "50px" }} onClick={nextPage}>
          다음</button>
      </div>
      
    </>
  );
}

export default PostForm;