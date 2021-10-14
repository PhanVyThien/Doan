import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import SideBar from "../../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFax, faPhone, faPlus } from "@fortawesome/free-solid-svg-icons";
import DeleteNotificationModal from "../../components/DeleteNotificationModal";

Home.getInitialProps = async (ctx) => {
  const res = await fetch("http://localhost:5035/courses/");
  const json = await res.json();
  return { data: json };
};

const ContentContainer = styled.div`
  padding-left: 250px;
`;
const Content = styled.div`
  margin: 20px;
  background-color: white;
  height: auto;
  width: auto;
  padding: 12px;
  border-radius: 12px;
  justify-content: center;
`;
const Button = styled.button`
  border-radius: 20px;
  background-color: lightskyblue;
  color: black;
  padding: 12px;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  border: none;
  margin: 4px;
  transition: transform 0.2s ease;
  &:hover {
    background-color: #e38b06;
    transform: translateY(-0.5rem) scale(1.02);
    color: #000;
  }
`;
export default function Home({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState("false");
  return (
    <div>
      <DeleteNotificationModal
        onClose={() => setShowModal(false)}
        show={showModal}
        id={itemId}
        prefix="course"
      >
        Hello from the modal!
      </DeleteNotificationModal>
      <SideBar></SideBar>
      <ContentContainer>
        <Content>
          <Link href="/course/addProduct">
            <Button>
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: "8px" }} />{" "}
              Thêm sản phẩm
            </Button>
          </Link>
          <div class="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Hình minh họa</th>
                  <th>Ngày nhập hàng</th>
                  <th>Số lượng nhập</th>
                  <th>Số lượng bán</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr>
                    <td>{item.Name}</td>
                    <td>
                      <Image
                        src="http://localhost:5035/upload/images/default.png"
                        width="50px"
                        height="50px"
                      />
                    </td>
                    <td>{item.DateIn}</td>
                    <td>{item.enteringQuantity}</td>
                    <td>{item.soldQuantity}</td>
                    <td>
                      <Link href={"/course/" + item._id}>
                        <Button> Sửa </Button>
                      </Link>
                      <a
                        onClick={() => {
                          setShowModal(true), setItemId(item._id);
                        }}
                      >
                        <Button> Xóa </Button>
                      </a>
                      <Link href={"/course/" + item._id}>
                        <Button> Chi tiết </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="row">
              <div className="col">
                <h5>Sản phẩm phát triển bởi BUG</h5>
              </div>
              <div className="col">
                <h5>Mọi thắc mắc xin liên hệ</h5>
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{ marginRight: "12px" }}
                />
                <FontAwesomeIcon icon={faFax} style={{ marginRight: "12px" }} />
              </div>
            </div>
          </div>
        </Content>
      </ContentContainer>
    </div>
  );
}
