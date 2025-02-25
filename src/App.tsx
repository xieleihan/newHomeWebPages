// 导入样式
import './style/App.scss';

// 引入i18n
import './lang/index';
import { useTranslation } from 'react-i18next';

function App() {

  const { t } = useTranslation();

  return (
    <>
      <div className="app">
        <div className="operate">
          <p className='title'>
            {t('startPages.title')}
          </p>
        </div>
        {/* 路由出口 */}
      </div>
    </>
  );
}

export default App;