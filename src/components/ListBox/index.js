import styled from "styled-components";
import Box from "../Box";

export const ListBox = ({ list, title, allUrl }) => {
  return (
    <ListBoxWrapper>
      <h2 className="smallTitle">
        {title}{" "}
        <a className="boxLink" href={allUrl}>
          ({list.length})
        </a>
      </h2>
      <ul>
        {list.slice(0, 6).map((item) => {
          return (
            <li key={`li_${item.id}`}>
              <a href={item.url} key={item.id} target="_blank">
                <img src={item.image} />
                <span>{item.title}</span>
              </a>
            </li>
          );
        })}
      </ul>

      <a className="boxLink" href={allUrl}>
        Ver todos
      </a>
    </ListBoxWrapper>
  );
};

export const ListBoxWrapper = styled(Box)`
  ul {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr;
    max-height: 220px;
    list-style: none;
  }
  img {
    object-fit: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  ul li a {
    display: inline-block;
    height: 102px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    span {
      color: #ffffff;
      font-size: 10px;
      position: absolute;
      left: 0;
      bottom: 10px;
      z-index: 2;
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 1;
      background-image: linear-gradient(0deg, #00000073, transparent);
    }
  }
`;
