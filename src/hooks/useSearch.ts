import { useEffect, useState } from 'react';
import debounce from '../utils/debounce';

interface UseSearchReturn {
  searchTerm: string;
  debouncedTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  clearSearch: () => void;
}

export default function useSearch(initialValue: string): UseSearchReturn {
  var [searchTerm, setSearchTerm] = useState(initialValue || '');
  var [debouncedTerm, setDebouncedTerm] = useState(initialValue || '');

  useEffect(
    function updateDebouncedValue() {
      var updateSearch = debounce(function handleSearch(nextValue: string) {
        setDebouncedTerm(nextValue.trim().toLowerCase());
      }, 220);

      updateSearch(searchTerm);
    },
    [searchTerm]
  );

  function clearSearch(): void {
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
