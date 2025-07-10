import { ReactNode } from 'react';

// Props
interface TableProps {
  children: ReactNode;
  className?: string;
}
interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}
interface TableBodyProps {
  children: ReactNode;
  className?: string;
}
interface TableRowProps {
  children: ReactNode;
  className?: string;
}
interface TableCellProps {
  children: ReactNode;
  isHeader?: boolean;
  className?: string;
}

// Table Component
const Table: React.FC<TableProps> = ({ children, className }) => {
  return (
    <div className="overflow-hidden rounded-sm">
      <table
        className={`min-w-full table-fixed ${className}`}
      >
        {children}
      </table>
    </div>
  );
};

// TableHeader Component
const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return (
    <thead
      className={`bg-brand-500 dark:bg-gray-800 text-gray-700 dark:text-gray-200 ${className}`}
    >
      {children}
    </thead>
  );
};

// TableBody Component
const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
  return (
    <tbody
      className={`bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
    >
      {children}
    </tbody>
  );
};

// TableRow Component
const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
  return (
    <tr
      className={` ${className}`}
    >
      {children}
    </tr>
  );
};

// TableCell Component
const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className,
}) => {
  const baseClass =
    'px-4 py-2 text-sm text-gray-900 dark:text-gray-100';
  const headerClass = 'font-semibold text-left text-white';
  const CellTag = isHeader ? 'th' : 'td';

  return (
    <CellTag
      className={`${baseClass} ${isHeader ? headerClass : ''} ${className}`}
    >
      {children}
    </CellTag>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
