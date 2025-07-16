import { useState } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import Form from '../../components/form/Form';
import Button from '../../components/ui/button/Button';
// import SortableList from '../../components/ui/sortable/SortableList';
import NestedSortableMenu from '../../components/ui/sortable/NestedSortableMenu';
import { PlusIcon } from '../../icons';
import { Modal } from '../../components/ui/modal';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';
import Select from '../../components/form/Select';

type MenuItem = {
  id: string;
  label: string;
  parentId?: string;
};

const initialData: MenuItem[] = [
  { id: '06', label: 'Beranda' },
  { id: '93', label: 'Master' },
  { id: '98', label: 'Client', parentId: '93' },
  { id: '99', label: 'Location', parentId: '93' },
  { id: '102', label: 'Transaction' },
  { id: '103', label: 'Gate', parentId: '102' },
  { id: '104', label: 'Lot', parentId: '102' },
];

const Menu = () => {
  const [items, setItems] = useState<MenuItem[]>(initialData);
  const [draggingParentId, setDraggingParentId] = useState<string | null>(null);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);

  const handleSearch = () => {};
  return (
    <>
      <PageBreadcrumb pageTitle="Menu" baseSection="System" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Menu Management
        </h3>
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between">
            <Form onSubmit={handleSearch}>
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
                  placeholder="Search Menu"
                  className="dark:bg-dark-900 h-9 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-6 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 md:w-[250px]"
                />
              </div>
            </Form>
            <Button size="sm" onClick={() => setIsOpenModalAdd(true)}>
              <PlusIcon /> Tambah data
            </Button>
          </div>

          <hr />

          <p className="text-black dark:text-white text-sm">
            Drag & drop judul menu untuk menyusun urutan menu!
          </p>

          <NestedSortableMenu
            items={items}
            setItems={setItems}
            // onOrderChange={saveToBackend}
            draggingParentId={draggingParentId}
            setDraggingParentId={setDraggingParentId}
          />
        </div>
      </div>

      {/* Modal add */}
      <Modal isOpen={isOpenModalAdd} onClose={() => setIsOpenModalAdd(false)}>
        <h1 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Tambah Menu
        </h1>

        <Form onSubmit={() => {}}>
          <div className="flex flex-col">
            <div className="mb-4">
              <Label htmlFor="parent_id" required >Parent menu</Label>
              <Select
                options={[
                  {
                    value: 'settings',
                    label: 'Settings',
                  },
                ]}
                onChange={() => {}}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" required >Nama Menu</Label>
                <Input type="text" id="name" />
              </div>
              <div>
                <Label htmlFor="description" required >Deskripsi Menu</Label>
                <Input type="text" id="description" />
              </div>
              <div>
                <Label htmlFor="url" required >Url Menu</Label>
                <Input type="text" id="url" placeholder="admin/..." />
              </div>
              <div>
                <Label htmlFor="order" required >Urutan Menu</Label>
                <Input type="text" id="order" />
              </div>
              <div>
                <Label htmlFor="group" required >Menu Group</Label>
                <Select
                  options={[
                    {
                      value: 'main',
                      label: 'Main',
                    },
                  ]}
                  defaultValue="main"
                  onChange={() => {}}
                />
              </div>
              <div>
                <Label htmlFor="icon">Icon Menu</Label>
                <Input type="text" id="icon" />
              </div>
              <div>
                <Label htmlFor="menu_active" required>Menu Aktif</Label>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'Ya',
                    },
                    {
                      value: '0',
                      label: 'Tidak',
                    },
                  ]}
                  defaultValue="1"
                  onChange={() => {}}
                />
              </div>
              <div>
                <Label htmlFor="show_menu" required>Tampilkan Menu</Label>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'Ya',
                    },
                    {
                      value: '0',
                      label: 'Tidak',
                    },
                  ]}
                  defaultValue="1"
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="flex flex-row w-full justify-end gap-3 mt-5">
              <Button size="md" colorScheme="success">
                Submit
              </Button>
              <Button
                size="md"
                colorScheme="gray"
                onClick={() => setIsOpenModalAdd(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Menu;
