import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import Form from '../../components/form/Form';
import Button from '../../components/ui/button/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { PlusIcon, TrashBinIcon, UserIcon } from '../../icons';

const UserAccount = () => {
  return (
    <>
      <PageBreadcrumb pageTitle="Akun User" baseSection="System" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Account Management
        </h3>
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between">
            <Form onSubmit={() => {}}>
              <div className="relative">
                <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                  <svg
                    className="fill-gray-500 dark:fill-gray-400"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                      fill=""
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search User"
                  className="dark:bg-dark-900 h-9 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-6 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 md:w-[250px]"
                />
              </div>
            </Form>
            <Button size="sm" variant="outline">
              <PlusIcon /> Tambah data
            </Button>
          </div>

          <hr />

          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader={true}>No.</TableCell>
                <TableCell isHeader={true}>Nama</TableCell>
                <TableCell isHeader={true}>Nama Pengguna</TableCell>
                <TableCell isHeader={true}>Role</TableCell>
                <TableCell isHeader={true}>Status</TableCell>
                <TableCell isHeader={true}>Akses Klien</TableCell>
                <TableCell isHeader={true}>Aksi</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>superadmin</TableCell>
                <TableCell>Super Admin</TableCell>
                <TableCell className="text-green-600 font-semibold">
                  Aktif
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => {}}
                    className="bg-warning-500 text-white hover:bg-warning-600"
                  >
                    <UserIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => {}}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    <TrashBinIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default UserAccount;
