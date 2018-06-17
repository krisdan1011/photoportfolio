import styled from "styled-components";

const StyledCategory = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-areas: "category-header" "category-content";
  grid-template-rows: .25fr 4fr;
`;

export default StyledCategory;