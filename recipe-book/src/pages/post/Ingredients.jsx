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
 
  // "품목" 및 "수량" 항목을 관리할 상태 변수 설정
  const [ingredients, setIngredients] = useState([
    { id: 1, selectedItem: '', quantity: '' } // 초기 항목
  ]);

  // "품목" 목록을 서버에서 가져오는 부분
  const api = IngredientsAPI();
  const [items, setItems] = useState([]);
  
  const fetchData = async () => {
    const itemsData = await api();
    console.log(itemsData.ingredients);
    setItems(itemsData.ingredients);
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectChange = (itemId, selectedItem) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === itemId
          ? { ...ingredient, selectedItem }
          : ingredient
      )
    );
  };

  const handleQuantityChange = (itemId, quantity) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === itemId
          ? { ...ingredient, quantity }
          : ingredient
      )
    );
  };

    // 레시피 등록 페이지로 이동
    const prevPage = () => {
      navigate("/posts/forms");
    };

  // "MdAdd" 버튼을 클릭할 때, 새로운 "품목"과 "수량" 항목을 추가합니다
  const addItem = () => {
    const newId = ingredients.length + 1; // 새로운 항목의 ID 생성
    setIngredients([
      ...ingredients,
      { id: newId, selectedItem: '', quantity: '' }
    ]);
  };

  const saveForm = async () => {
    // 게시글을 저장하는 로직을 추가
    await axios
      .post("https://rest-recipe-book-dptb.run.goorm.site", {
        title,
        contents,
        ingredients: ingredients, // "품목" 및 "수량" 항목 배열을 전송
      })
      .then((res) => {
        alert("등록되었습니다");
        navigate("/posts");
      });
  };  


  return (
    <>
      <div>요리 이름: {title}</div>
      <div>레시피 내용: 
        <div dangerouslySetInnerHTML={{ __html: contents }} />
      </div>


      <h2>재료를 등록해주세요</h2>
      <div>
        {ingredients.map((ingredient) => (
          <div key={ingredient.id}>
            <select
              value={ingredient.selectedItem}
              onChange={(e) => handleSelectChange(ingredient.id, e.target.value)}>
              <option value="">품목을 선택해 주세요.</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select> &nbsp; 
            <input
              type="text"
              placeholder="수량"
              value={ingredient.quantity}
              onChange={(e) => handleQuantityChange(ingredient.id, e.target.value)}/>
          </div>
        ))}

        <button onClick={addItem}>
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
