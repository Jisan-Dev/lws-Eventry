"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const doSearch = useDebounce((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathName}?${params.toString()}`);
  }, 2000);

  const handleSearch = (term) => {
    doSearch(term);
  };

  return (
    <input
      type="text"
      placeholder="Search an Event"
      className="bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("query")?.toString()}
    />
  );
}
