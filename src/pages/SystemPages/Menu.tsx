import { useState } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import Form from '../../components/form/Form';
import Button from '../../components/ui/button/Button';
// import SortableList from '../../components/ui/sortable/SortableList';
import NestedSortableMenu from '../../components/ui/sortable/NestedSortableMenu';
import { PlusIcon } from '../../icons';

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

  // const saveToBackend = async (sortedItems: MenuItem[]) => {
  //   // Contoh kirim ke backend
  //   try {
  //     const response = await fetch("/api/save-menu-order", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ menu: sortedItems }),
  //     });

  //     const result = await response.json();
  //     console.log('✅ Saved:', 'tes');
  //   } catch (err) {
  //     console.error('❌ Failed to save:', err);
  //   }
  // };

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
            <Button size="sm" variant="outline" className="">
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
    </>
  );
};

export default Menu;
