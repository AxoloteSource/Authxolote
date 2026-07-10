import { Page } from '@/components/Page/Page'
import { DataTableFilter } from '@/components/Tables/DataTableFilter/DataTableFilter'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useServiceIndexCoupons } from '@/services/rewards/coupons/useServiceCoupons'
import { CouponForm } from './partials/CouponForm/CouponForm'
import { FilterFormCoupon } from './partials/FilterFormCoupon'
import { useCouponsPage } from './useCouponsPage'

const breadCrumblesItems = [{ to: RoutesBackoffice.Home, children: 'home' }, { children: 'coupons' }]

const CouponsPage = () => {
  const {
    filters,
    open,
    renderersMap,
    close,
    isOpen,
    selectedItem,
    initialStep,
    refreshKey,
    handleSuccess
  } = useCouponsPage()

  return (
    <Page titleTranslation="coupons" breadCrumblesItems={breadCrumblesItems}>
      <DataTableFilter key={refreshKey} filters={filters} onClickNew={open} service={useServiceIndexCoupons} renderersMap={renderersMap} payload={{ order_dir: 'asc' }}>
        {(formik) => <FilterFormCoupon formik={formik} />}
      </DataTableFilter>
      <CouponForm onSuccess={handleSuccess} selectedItem={selectedItem} initialStep={initialStep} close={close} isOpen={isOpen} />
    </Page>
  )
}

export default CouponsPage
