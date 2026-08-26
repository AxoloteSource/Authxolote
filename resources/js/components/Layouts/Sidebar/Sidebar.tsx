import { MenuV2 } from '@/components/MenuV2/MenuV2'
import { toggleSidebar } from '@/store/themeConfigSlice'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { NavLink } from 'react-router-dom'
import { useSidebar } from './useSidebar'

const Sidebar = () => {
  const { semidark, dispatch, t } = useSidebar()

  return (
    <div className={semidark ? 'dark' : ''}>
      <nav
        className={`sidebar fixed top-0 bottom-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
          semidark ? 'text-white-dark' : ''
        }`}
      >
        <div className="bg-sidebar-background h-full">
          <div className="flex items-center justify-between px-4 py-3">
            <NavLink to="/" className="main-logo flex shrink-0 items-center">
              <span className="dark:text-white-light align-middle text-2xl font-semibold lg:inline ltr:ml-1.5 rtl:mr-1.5">{t('brand_name')}</span>
            </NavLink>

            <button
              type="button"
              className="collapse-icon dark:hover:bg-dark-light/10 dark:text-white-light flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180"
              onClick={() => dispatch(toggleSidebar())}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto h-5 w-5">
                <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  opacity="0.5"
                  d="M16.9998 19L10.9998 12L16.9998 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
              <h2 className="bg-background -mx-4 mb-1 flex items-center px-7 py-3 font-extrabold uppercase" style={{ opacity: 0.5 }}>
                <svg
                  className="hidden h-5 w-4 flex-none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>{t('menu_1')}</span>
              </h2>

              <li className="nav-item">
                <MenuV2 />
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar