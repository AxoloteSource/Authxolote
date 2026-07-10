import { InputWithIcon } from '@/components/Form/Input/inputWithIcon'
import { DataTable } from '@/components/Tables/DataTable/DataTable'
import { useDataTable } from '@/hooks/useDataTable'
import { IImage } from '@/interfaces/models/Image/IImage'
import { useServiceIndexImages } from '@/services/rewards/images/useServiceImages'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IGalleryTableProps {
  onSelect: (image: IImage | null) => void
  selectedRecords: Record<string, unknown>[]
  setSelectedRecords: (records: Record<string, unknown>[]) => void
}

export const GalleryTable = ({ onSelect, selectedRecords, setSelectedRecords }: IGalleryTableProps) => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')

  const renderersMap = {
    path: (data: IImage) => <img src={`/storage/${data.path}`} className="h-25 w-25 rounded object-cover shadow-sm" alt={data.name} />
  }

  const { dataTableProps, isLoading } = useDataTable({
    service: useServiceIndexImages,
    payload: { filters: [], search },
    renderersMap,
    dataTableProps: (defaultProps) => ({
      ...defaultProps,
      selectedRecords,
      onSelectedRecordsChange: (records: Record<string, unknown>[]) => {
        const lastSelected = records.length > 0 ? records[records.length - 1] : null
        setSelectedRecords(lastSelected ? [lastSelected] : [])
        onSelect(lastSelected as IImage | null)
      },
      onRowClick: ({ record: row }: { record: Record<string, unknown> }) => {
        const isSelected = (selectedRecords as Record<string, unknown>[]).some((r) => r.id === row.id)
        if (isSelected) {
          setSelectedRecords([])
          onSelect(null)
        } else {
          setSelectedRecords([row])
          onSelect(row as unknown as IImage)
        }
      },
      allRecordsSelectionCheckboxProps: { style: { display: 'none' } },
      rowStyle: () => ({ cursor: 'pointer' }),
      rowClassName: (record: Record<string, unknown>) =>
        (selectedRecords as Record<string, unknown>[]).some((r) => r.id === record.id) ? 'bg-blue-100' : undefined
    })
  })

  return (
    <>
      <style>{`
        .mantine-datatable-row-selector-cell .mantine-Checkbox-input {
          border: 1px solid #94a3b8 !important;
          background-color: #f8fafc !important;
        }
        .mantine-datatable-row-selector-cell .mantine-Checkbox-input:checked {
          background-color: #3b82f6 !important;
          border-color: #3b82f6 !important;
        }
        .mantine-datatable-row-selector-cell .mantine-Checkbox-icon {
          width: 100% !important;
          height: 100% !important;
          transform: none !important;
        }
      `}</style>
      <div className="mb-4">
        <InputWithIcon name="search" value={search} placeholder={t('search')} inputCallback={(e) => setSearch(e.target.value)} />
      </div>
      <DataTable datatablePros={dataTableProps} isLoading={isLoading} />
    </>
  )
}
