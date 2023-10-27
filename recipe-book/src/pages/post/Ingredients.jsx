import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import IngredientsAPI from "../../api/posts/IngredientsAPI";

function Ingredients() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const title = queryParams.get("title");
  const contents = queryParams.get("contents");

  const saveForm = async () => {
    // 게시글을 저장하는 로직을 추가
    await axios
      .post("https://rest-recipe-book-dptb.run.goorm.site")
      .then((res) => {
        alert("등록되었습니다");
        navigate("/posts"); // 저장 후, 게시글 리스트 페이지로 이동(현재는 메인)
      });
  };


  // 품목 정보(코드, 이름)을 가져와서 상태변수에 설정
  const [items, setItems] = useState([]);   // TODO 연동 완료 후 초기값을 []으로 변경
 
  const api = IngredientsAPI();
  useEffect(async () => {
    const items = await api();
    console.log(items.ingredients); 
    setItems(items.ingredients)
  }, []);


  // 선택한 재료 정보를 가지고 있는 상태변수
  const [selectedItem, setSelectedItem] = useState('');
  const handlerChangeSelectedItem = e => setSelectedItem(e.target.value);

  // 서버 응답 확인??

  // 재료 추가 버튼 활성화
  

  // 레시피 등록 페이지로 이동
  const prevPage = () => {
    navigate("/posts/forms"); 
  };

  return (
    <>
      <div>요리 이름: {title}</div>
      <div>레시피 내용: {contents}</div>

      <h2>재료를 등록해주세요</h2> 
      <div>
        <select onChange={handlerChangeSelectedItem}>
          <option selected>재료를 선택해 주세요.</option>
          {
            items.length > 0 && items.map((item, idx) => <option key={idx} value={item.id}>{item.name}</option>)
          }
        </select>
        <br/>
        품목: {
          items.length > 0 && selectedItem 
            && items.filter(item => item.id === Number(selectedItem))[0].name 
        }
        {/* 품목: {items.length > 0 && selectedItem && items.filter(item => item.id === selectedItem)[0].name}  */}
        수량: {}
        <button type="submit">
          <MdAdd />
        </button>
        <br />
        <button onClick={prevPage}>이전</button>
        <button onClick={saveForm}>저장</button>
      </div>
    </>
  );
}

export default Ingredients;
