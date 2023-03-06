import styled from 'styled-components';

import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_BORDER_SIZE,
  DEFAULT_BORDER_STYLE,
  PRIMARY_COLOR_6,
} from '../../../shared/recommendation-constants';

const PAGINATION_PREV_NORMAL = '/assets/svg/PaginationPrevNormalIcon.svg';
const PAGINATION_PREV_DISABLED = '/assets/svg/PaginationPrevDisabledIcon.svg';
const PAGINATION_NEXT_NORMAL = '/assets/svg/PaginationNextNormalIcon.svg';
const PAGINATION_NEXT_DISABLED = '/assets/svg/PaginationNextDisabledIcon.svg';

const StyledPageList = styled.ul`
  text-align: center;
  list-style-type: none;
`;

const StyledPageListItemNormal = styled.li`
  display: inline-block;
  font-size: 14px;
  height: 24px;
  width: 24px;
  list-style-position: inside;
  text-align: center;
  cursor: pointer;
`;

const StyledPageListItemCur = styled(StyledPageListItemNormal)`
  border: ${DEFAULT_BORDER_SIZE} ${DEFAULT_BORDER_STYLE} ${PRIMARY_COLOR_6};
  border-radius: ${DEFAULT_BORDER_RADIUS};
  color: ${PRIMARY_COLOR_6};
`;

const StyledArrow = styled.img`
  vertical-align: top;
  height: 24px;
  width: 24px;
`;

const Pagination = ({curPage, totalPage, perPagination, setCurPage}) => {
  const paginationHandler = (e, page) => {
    e.preventDefault();
    setCurPage(page);
  };

  const startPage =
    Math.floor((curPage - 1) / perPagination) * perPagination + 1;
  const endPage = Math.min(startPage + perPagination - 1, totalPage);

  const isPrevEnable = !(startPage === 1);
  const isNextEnable = !(endPage === totalPage);

  const prevImage = isPrevEnable
    ? PAGINATION_PREV_NORMAL
    : PAGINATION_PREV_DISABLED;
  const nextImage = isNextEnable
    ? PAGINATION_NEXT_NORMAL
    : PAGINATION_NEXT_DISABLED;

  return (
    <StyledPageList>
      <StyledPageListItemNormal
        onClick={e => isPrevEnable && paginationHandler(e, startPage - 1)}>
        <StyledArrow src={prevImage} />
      </StyledPageListItemNormal>
      {Array.from(Array(endPage - startPage + 1).keys())
        .map(page => page + startPage)
        .map(page => {
          const StyledPageListItem =
            curPage === page ? StyledPageListItemCur : StyledPageListItemNormal;
          return (
            <StyledPageListItem
              key={page}
              onClick={e => paginationHandler(e, page)}>
              {page}
            </StyledPageListItem>
          );
        })}
      <StyledPageListItemNormal
        onClick={e => isNextEnable && paginationHandler(e, endPage + 1)}>
        <StyledArrow src={nextImage} />
      </StyledPageListItemNormal>
    </StyledPageList>
  );
};

export default Pagination;
