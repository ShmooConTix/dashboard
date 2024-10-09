import { UserTable } from "./_components/UserTable";
import { AddUserPopup } from "./_components/AddUserPopup";

export default function Page() {
  return (
    <div>
      <div className="w-full flex gap-x-4 py-4 px-2 justify-end">
        <AddUserPopup />
      </div>
      <UserTable />
    </div>
  );
}
