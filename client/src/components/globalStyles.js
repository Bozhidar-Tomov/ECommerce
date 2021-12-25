import { createGlobalStyle } from "styled-components";
// export const GlobalStyles = createGlobalStyle`
// body,
// .card,
// .form-control,
// .form-select,
// .input-group-text,
// .nav-link {
//     background-color: ${({ theme }) => theme.body} !important;
//     color: ${({ theme }) => theme.text} !important;
//     transition: all 0.3s linear;
//   }

// .form-check-input{
//   background-color: ${({ theme }) => theme.checkBox};}

// .pagination > li > a,
// .pagination > li > span
// {
//   background-color: ${({ theme }) => theme.paginationBgColor};
//   color: ${({ theme }) => theme.paginationColor};
// }
// .pagination > li > a:hover,
// .pagination > li > span:hover{
//   background-color: ${({ theme }) => theme.paginationHoverColor};
//   color: ${({ theme }) => theme.text};
// }
//   `;

export const GlobalStyles = createGlobalStyle`
body,
.input-group-text {
    background-color: ${({ theme }) => theme.body} !important;
    color: ${({ theme }) => theme.text} !important;
  }
  
.form-check-input{
  background-color: ${({ theme }) => theme.checkBox};}

.pagination > li > a,
.pagination > li > span
{
  background-color: ${({ theme }) => theme.paginationBgColor}; 
  color: ${({ theme }) => theme.paginationColor};
}
.pagination > li > a:hover,
.pagination > li > span:hover{
  background-color: ${({ theme }) => theme.paginationHoverColor};
  color: ${({ theme }) => theme.text};
}
  `;
