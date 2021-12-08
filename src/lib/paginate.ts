import { Emoji } from '../types';

interface PaginateProps {
  data: Emoji[];
  currentPage: number;
}

export function paginator({ data, currentPage = 1 }: PaginateProps) {
  let page = currentPage || 1;
  let perPage = 60;
  let offset = (page - 1) * perPage;
  let paginatedItems = data.slice(offset).slice(0, perPage);
  let totalPages = Math.ceil(data.length / perPage);

  return {
    page,
    perPage,
    prevPage: page - 1 ? page - 1 : null,
    nextPage: totalPages > page ? page + 1 : null,
    total: data.length,
    totalPages,
    data: paginatedItems,
  };
}
