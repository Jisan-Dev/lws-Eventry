import SearchInput from "./search-input";

export default function Header() {
  return (
    <div className="flex justify-between">
      <h1 className="font-bold text-3xl">Discover Events</h1>

      <div>
        <SearchInput />
      </div>
    </div>
  );
}
