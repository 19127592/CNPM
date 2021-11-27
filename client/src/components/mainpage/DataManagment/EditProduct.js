import React, { useContext, useState, useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { GlobalState } from "../../../GlobalState";
import { useParams, Link } from "react-router-dom";
import ProductItem from "../productItem/ProductItem";
export default function ProductDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [ProductDetail, setProductDetail] = useState([]);
  const [EditProductDetail, setEditProductDetail] = useState([]);
  const [value, setValue] = useState([]);

  const text = useRef(["I am editable"]);
  const name = useRef("");
  console.log(text.current);

  const handleChange = (evt) => {
    text.current = evt.target.value;
    name.current = evt.target;
    setValue(text.current);
  };

  const handleBlur = () => {
    console.log(text.current);
    console.log(name.current);
    console.log(value);
  };
  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setProductDetail(product);
      });
    }
  }, [params.id, products, EditProductDetail, value]);

  const addEditContent = (e) => {
    const html = e.target.innerText;
    const name = e.target.name;
    console.log("Hi");
    setEditProductDetail({ ...EditProductDetail, [name]: html });
  };

  const confirmOrder = (e) => {
    console.log(EditProductDetail);
  };
  if (ProductDetail.length === 0) return null;

  return (
    <>
      <div className="edit-product">
        <div className="img">
          <img src={ProductDetail.images.url} alt="" className="edit-img" />
        </div>
        <div className="content">
          <div className="content-edit">
            <div className="content-detail">
              <div className="context">
                Title :{" "}
                <ContentEditable
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  contentEditable="true"
                  html={text.current}
                />
              </div>
              <div className="edit-icon">Edit</div>
            </div>
            <div className="content-detail">
              <div className="context">
                Price : ${" "}
                <span
                  className="edit"
                  onChange={addEditContent}
                  contenteditable="true"
                >
                  {ProductDetail.price}
                </span>
              </div>
              <div className="edit-icon">Edit</div>
            </div>
            <div className="content-detail">
              <div className="context">
                Brand :{" "}
                <span
                  className="edit"
                  onChange={addEditContent}
                  contenteditable="true"
                >
                  {ProductDetail.brand}
                </span>
              </div>
              <div className="edit-icon">Edit</div>
            </div>
            <div className="content-detail">
              <div className="context">
                Description :{" "}
                <span
                  className="edit"
                  onChange={addEditContent}
                  contenteditable="true"
                >
                  {ProductDetail.description}
                </span>
              </div>
              <div className="edit-icon">Edit</div>
            </div>
            <div className="content-detail">
              <div>
                Content :{" "}
                <span
                  className="edit"
                  onChange={addEditContent}
                  contenteditable="true"
                >
                  {ProductDetail.content}
                </span>
              </div>
              <div className="edit-icon">Edit</div>
            </div>
          </div>
        </div>
        <div>
          <input
            type="submit"
            value="Order Now"
            className="order"
            onClick={confirmOrder}
          />
        </div>
      </div>
    </>
  );
}
