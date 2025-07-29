import { useTranslate } from '@/hooks/common-hooks';
import { Space, Typography } from 'antd';
import React from 'react';
import './right-panel.less';

const { Title, Paragraph } = Typography;

const LoginRightPanel: React.FC = () => {
  const { t } = useTranslate('login');

  return (
    <div className="right-panel-content">
      {/* 装饰圆点 */}
      <div className="dot dot-1"></div>
      <div className="dot dot-2"></div>

      <div className="tech-circle">
        <div className="circle-inner"></div>
      </div>

      <div className="logo-container">
        <img
          src="/logo.svg"
          alt={t('title')}
          className="logo"
          width={64}
          height={64}
        />
      </div>

      <Space
        direction="vertical"
        size="large"
        style={{
          width: '100%',
          maxWidth: '560px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Title level={2} style={{ marginBottom: '16px', color: '#fff' }}>
          {t('title')}
        </Title>
        <Paragraph
          style={{
            fontSize: '18px',
            marginBottom: '32px',
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          {t('description')}
        </Paragraph>

        <div className="features">
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <div className="feature-text">{t('feature1')}</div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <div className="feature-text">{t('feature2')}</div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <div className="feature-text">{t('feature3')}</div>
          </div>
        </div>
      </Space>

      {/* 装饰性几何图形 */}
      <div className="tech-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
};

export default LoginRightPanel;
