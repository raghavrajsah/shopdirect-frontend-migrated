import { useEffect, useState } from 'react';
import debounce from '../utils/debounce';

export default function useSearch(initialValue) {
  var [searchTerm, setSearchTerm] = useState(initialValue || '');
  var [debouncedTerm, setDebouncedTerm] = useState(initialValue || '');

  useEffect(
    function updateDebouncedValue() {
      var updateSearch = debounce(function handleSearch(nextValue) {
        setDebouncedTerm(nextValue.trim().toLowerCase());
      }, 220);

      updateSearch(searchTerm);
    },
    [searchTerm]
  );

  function clearSearch() {
    setSearchTerm('');
    setDebouncedTerm('');
  }

  return {
    searchTerm: searchTerm,
    debouncedTerm: debouncedTerm,
    setSearchTerm: setSearchTerm,
    clearSearch: clearSearch,
  };
}
